import * as fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CryptoCurrencyEntity } from 'src/crypto-currency/crypto-currency.entity';
import { CryptoCurrencyService } from 'src/crypto-currency/crypto-currency.service';
import { Exception } from 'interceptors/exception.filter';

@Injectable()
export class CryptoRiskService implements OnModuleInit {
    constructor(
        private readonly cryptoCurrencyService: CryptoCurrencyService
    ) { }

    public static trainedModelCryptoRisk: tf.LayersModel;

    async onModuleInit() {
        const { rows: cryptos } = await this.cryptoCurrencyService.findAll();

        const data = this.preprocessDataset(cryptos);

        const labels = cryptos.map(crypto => {
            const volatility = (crypto.high - crypto.low) / crypto.close * 100;

            // Critérios para Baixo Risco
            if (volatility < 5 && crypto.volume > 1e6) return [1, 0, 0];

            // Critérios para Médio Risco
            if (volatility >= 5 && volatility <= 15 && crypto.volume > 5e5 && crypto.volume <= 1e6) return [0, 1, 0];

            // Critérios para Alto Risco
            return [0, 0, 1];
        });

        this.trainModel(data, labels, cryptos);
    }

    preprocessDataset(cryptos: CryptoCurrencyEntity[]): number[][] {
        return cryptos.map(crypto => this.preprocessData(crypto));
    }

    preprocessData(crypto: CryptoCurrencyEntity): number[] {
        const normalize = (value: number, min: number, max: number): number => {
            return (value - min) / (max - min);
        }

        const volatility = crypto.high - crypto.low;

        const openNormalized = normalize(crypto.open, 0, 1e5);
        const closeNormalized = normalize(crypto.close, 0, 1e5);
        const volumeNormalized = normalize(crypto.volume, 0, 1e5);
        const volatilityNormalized = normalize(volatility, 0, 1e5);

        return [volumeNormalized, openNormalized, closeNormalized, volatilityNormalized];
    }

    async trainModel(data: number[][], labels: number[][], cryptos: CryptoCurrencyEntity[]): Promise<void> {
        const model = tf.sequential();
        /**
           * Definir as camadas do modelo
           */
        model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [4] }));
        model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

        model.compile({
            optimizer: tf.train.adam(),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        });


        /**
         * Treinamento do Modelo
         */
        const xs = tf.tensor2d(data);
        const ys = tf.tensor2d(labels);

        await model.fit(xs, ys, {
            epochs: 10,
            batchSize: 64,
            validationSplit: 0.05,
        });


        CryptoRiskService.trainedModelCryptoRisk = model;
        console.log('Modelo Treinado com sucesso!!');

        await this.classifyRisk(cryptos);
    }

    async classifyRisk(cryptos: CryptoCurrencyEntity[]): Promise<void> {
        let log: string;
        const totalLength = cryptos.length;

        await Promise.all(cryptos.map(async (crypto, i) => {
            try {
                if (!crypto.risk || process.env.ENABLE_RISK_MODEL_TRAINING === 'true') {
                    const risk = await this.getRiskClassification(crypto);
                    await this.cryptoCurrencyService.update(crypto.id, { ...crypto, risk });

                    // Log a cada 10% de conclusão
                    const progressPercentage = Math.floor((i + 1) / totalLength * 100);
                    if (progressPercentage % 10 === 0) {
                        const newLog = `Classificação de Risco: ${progressPercentage}%`
                        if (newLog != log) {
                            log = newLog;
                            console.log(log);
                        }
                    };
                }

            } catch (e) {
                console.error(e);
            }
        }));

        console.log('Classificação de Risco concluída!');
    }

    async getRiskClassification(crypto: CryptoCurrencyEntity): Promise<string> {
        try {
            const model = CryptoRiskService.trainedModelCryptoRisk;

            if (!model) {
                const errorMessage = 'Modelo de Classificação de Risco ainda não está treinado';
                throw Object.assign(new Error(), { errorMessage });
            }

            const processedData = tf.tensor2d([this.preprocessData(crypto)]);;

            const prediction = model.predict(processedData) as tf.Tensor;

            const result = Math.max(...prediction.dataSync());
            const [low, medium, high] = prediction.dataSync();


            let risk: string;
            if (result < 0.81) risk = 'Baixo';
            else if (result >= 0.81 && result <= 0.95) risk = 'Médio';
            else risk = 'Alto';

            return risk;



        } catch (e) {
            new Exception(e.errorMessage || 'Erro ao classificar o risco do ativo');
        }
    }
}
