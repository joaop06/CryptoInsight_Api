import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { CryptoRiskService } from 'src/crypto-risk/crypto-risk.service';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { CryptoCurrencyServiceInterface } from './interfaces/crypto-currency.service.interface';


import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs';
import * as csvParser from 'csv-parser';


@Injectable()
export class CryptoCurrencyService implements CryptoCurrencyServiceInterface, OnModuleInit {
    constructor(
        @InjectRepository(CryptoCurrencyEntity)
        private repository: Repository<CryptoCurrencyEntity>,
    ) { }

    async onModuleInit() {
        // Chama a função de leitura dos arquivos CSV ao iniciar o módulo
        // await this.loadAndProcessCsvFiles();

        // Chama a função de treinamento do modelo ao iniciar o módulo
        // await this.trainModelOnStartup();
    }

    async loadAndProcessCsvFiles() {
        const existsData = await this.repository.find();
        if (existsData.length === 0) {
            const files = fs.readdirSync('Dataset');

            await Promise.all(files.map(file => {
                const name = file.replace('.csv', '');
                this.loadCsvData(`Dataset/${file}`, name);
            }));
        }
    }

    async trainModelOnStartup() {
        const processedData = await this.preProcessData();

        await this.trainModel(processedData);
        console.log('Modelo treinado com sucesso!')
    }

    async loadCsvData(filePath: string, cryptoName: string) {
        const records = [];
        const fullPath = path.resolve(filePath);

        return await new Promise<void>((resolve, reject) => {
            fs.createReadStream(fullPath)
                .pipe(csvParser())
                .on('data', (row) => {
                    const cryptoData = new CryptoCurrencyEntity();

                    cryptoData.name = cryptoName;
                    cryptoData.date = new Date(row.Date);
                    cryptoData.open = parseFloat(row.Open);
                    cryptoData.high = parseFloat(row.High);
                    cryptoData.low = parseFloat(row.Low);
                    cryptoData.close = parseFloat(row.Close);
                    cryptoData.volume = parseFloat(row.Volume);
                    cryptoData.currency = row.Currency;

                    records.push(cryptoData);
                })
                .on('end', async () => {
                    try {
                        for (const record of records) {
                            await this.create(record);
                        }

                    } catch (e) {
                        console.error(e.message)
                    }
                })
            // .on('error', (error) => console.error(error))
        });
    }

    async preProcessData() {
        const cryptos = await this.findAll({ order: { name: 'DESC' } });

        const processedData = cryptos.rows.map(crypto => {
            const variation = (crypto.close - crypto.open) / crypto.open;

            return {
                variation,
                date: crypto.date,
                volume: crypto.volume,
                risk: this.calculateRisk(variation),
            };
        });

        return processedData;
    }

    calculateRisk(variation: number): string {
        if (variation < 0.02) return 'low';
        if (variation > 0.05) return 'high';
        if (variation >= 0.02 && variation <= 0.05) return 'medium';
    }

    async trainModel(data: any[]) {
        const model = tf.sequential();

        model.add(tf.layers.dense({ inputShape: [2], units: 10, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));


        model.compile({
            metrics: ['accuracy'],
            optimizer: tf.train.adam(),
            loss: 'categoricalCrossentropy',
        });

        const xs = data.map(d => [d.variation, d.volume]);
        const ys = data.map(d => this.riskToTensor(d.risk));


        // await model.save(`file://path_to_model`);

        return model;
    }

    riskToTensor(risk: string): number[] {
        if (risk === 'low') return [1, 0, 0];
        if (risk === 'medium') return [0, 1, 0];
        if (risk === 'Alto') return [0, 0, 1];
    }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    async findOne(id: number): Promise<CryptoCurrencyEntity> {
        return await this.repository.findOneBy({ id });
    }

    async create(object: CreateCryptoCurrencyDto): Promise<CryptoCurrencyEntity> {
        return await this.repository.save(object);
    }

    async update(id: number, object: Partial<CryptoCurrencyEntity>): Promise<any> {
        return await this.repository.update(id, object);
    }

    async findAll(options?: FindOptionsDto<CryptoCurrencyEntity>): Promise<FindReturnModelDto<CryptoCurrencyEntity>> {
        const [rows, count] = await this.repository.findAndCount(options);
        return { rows, count };
    }

    async predictRisk(inputData: { variation: number, volume: number }) {
        const model = await tf.loadLayersModel(`file://path_to_model/model.json`);

        const inputTensor = tf.tensor2d([[inputData.variation, inputData.volume]]);
        const prediction = model.predict(inputTensor) as tf.Tensor;

        const predictionArray = prediction.dataSync();
        const riskIndex = predictionArray.indexOf(Math.max(...predictionArray));

        return this.tensorToRisk(riskIndex);
    }

    tensorToRisk(index: number): string {
        if (index === 0) return 'Baixo';
        if (index === 1) return 'Médio';
        if (index === 2) return 'Alto';
    }
}
