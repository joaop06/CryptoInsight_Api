import * as fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CryptoCurrencyEntity } from 'src/crypto-currency/crypto-currency.entity';
import { CryptoCurrencyService } from 'src/crypto-currency/crypto-currency.service';

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

        await this.trainModel(data, labels);
        console.log('Modelo Treinado com sucesso!!');

        await this.classifyRisk(cryptos);
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

    async trainModel(data: number[][], labels: number[][]): Promise<tf.LayersModel> {
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
        return model;
    }

    async classifyRisk(cryptos: CryptoCurrencyEntity[]): Promise<void> {
        let log: string;
        const model = CryptoRiskService.trainedModelCryptoRisk;

        await new Promise<void>(resolve => {
            const totalLength = cryptos.length;

            cryptos.forEach(async (crypto, i) => {
                const processedData = tf.tensor2d([this.preprocessData(crypto)]);;

                const prediction = model.predict(processedData) as tf.Tensor;
                const result = Math.max(...prediction.dataSync());

                let risk: string;

                if (result < 0.65) risk = 'Baixo';
                else if (result >= 0.65 && result <= 0.85) risk = 'Médio';
                else risk = 'Alto';

                await this.cryptoCurrencyService.update(crypto.id, { ...crypto, risk });


                // Log a cada 10% de conclusão

                const progressPercentage = Math.floor((i + 1) / totalLength * 100);
                if (progressPercentage % 10 === 0) {
                    const newLog = `Progresso do Treinamento: ${progressPercentage}%`
                    if (newLog != log) {
                        log = newLog;
                        console.log(log);
                    }
                };
            });

            resolve();
        })
    }
}
