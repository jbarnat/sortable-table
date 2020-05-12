import { writeFileSync } from "fs";
import faker from "faker";

import { IColumn, ITableDataSet } from "./src/Table/types";

type IColumnMeta = {
  width: number;
  name: string;
  generatorFn: () => string;
};

const dataSetCollection: ITableDataSet<IColumnMeta>[] = [
  {
    tableName: "Green table",
    tableId: 1,
    columns: [
      { width: 5, name: "Country Code", generatorFn: faker.address.countryCode },
      { width: 20, name: "Country", generatorFn: faker.address.country },
      { width: 20, name: "County", generatorFn: faker.address.county },
      { width: 20, name: "City", generatorFn: faker.address.city },
      { width: 20, name: "Street Name", generatorFn: faker.address.streetName },
      { width: 10, name: "latitude", generatorFn: faker.address.latitude },
      { width: 10, name: "longitude", generatorFn: faker.address.longitude },
      { width: 10, name: "color", generatorFn: faker.commerce.color },
      { width: 20, name: "productName", generatorFn: faker.commerce.productName },
      { width: 15, name: "department", generatorFn: faker.commerce.department },
      { width: 20, name: "companyName", generatorFn: faker.company.companyName },
      { width: 5, name: "price", generatorFn: faker.commerce.price },
    ],
    rows: [],
    total: 20,
  },
  {
    tableName: "Blue table",
    tableId: 2,
    columns: [
      { width: 10, name: "latitude", generatorFn: faker.address.latitude },
      { width: 10, name: "longitude", generatorFn: faker.address.longitude },
      { width: 5, name: "color", generatorFn: faker.commerce.color },
      { width: 15, name: "City", generatorFn: faker.address.city },
      { width: 15, name: "County", generatorFn: faker.address.county },
      { width: 15, name: "Country", generatorFn: faker.address.country },
      { width: 5, name: "Country Code", generatorFn: faker.address.countryCode },
      { width: 15, name: "Street Name", generatorFn: faker.address.streetName },
      { width: 15, name: "productName", generatorFn: faker.commerce.productName },
      { width: 15, name: "department", generatorFn: faker.commerce.department },
      { width: 15, name: "companyName", generatorFn: faker.company.companyName },
      { width: 5, name: "price", generatorFn: faker.commerce.price },
    ],
    rows: [],
    total: 100,
  },
  {
    tableName: "Test table",
    tableId: 3,
    columns: [
      { width: 8, name: "AAA 1", generatorFn: () => "AAA 1" },
      { width: 9, name: "BBB 3", generatorFn: () => "BBB 2" },
      { width: 10, name: "CCC 3", generatorFn: () => "CCC 3" },
      { width: 11, name: "DDD 4", generatorFn: () => "DDD 4" },
      { width: 12, name: "EEE 5", generatorFn: () => "EEE 5" },
      { width: 13, name: "FFF 6", generatorFn: () => "FFF 6" },
      { width: 14, name: "GGG 7", generatorFn: () => "GGG 7" },
      { width: 15, name: "HHH 8", generatorFn: () => "HHH 8" },
      { width: 16, name: "III 9", generatorFn: () => "III 9" },
      { width: 17, name: "JJJ 10", generatorFn: () => "JJJ 10" },

    ],
    rows: [],
    total: 10,
  },
  {
    tableName: "Test table 2",
    tableId: 4,
    columns: [
      { width: 21, name: "AAA 1", generatorFn: () => "AAA 1" },
      { width: 19, name: "BBB 3", generatorFn: () => "BBB 2" },
      { width: 17, name: "CCC 3", generatorFn: () => "CCC 3" },
      { width: 15, name: "DDD 4", generatorFn: () => "DDD 4" },
      { width: 13, name: "EEE 5", generatorFn: () => "EEE 5" },
      { width: 11, name: "FFF 6", generatorFn: () => "FFF 6" },
      { width: 9, name: "GGG 7", generatorFn: () => "GGG 7" },
      { width: 7, name: "HHH 8", generatorFn: () => "HHH 8" },
      { width: 5, name: "III 9", generatorFn: () => "III 9" },
      { width: 3, name: "SSS 10", generatorFn: () => "SSS 10" },

    ],
    rows: [],
    total: 10,
  },
];

function transformMetaIntoData(
  dataSetCollection: ITableDataSet<IColumnMeta>[]
): ITableDataSet<IColumn>[] {
  return dataSetCollection.map(({ total, columns, tableName, tableId }) => ({
    tableId,
    tableName,
    columns: columns.map((column, i) => ({
      columnId: i,
      name: column.name,
      width: column.width,
    })),
    rows: [...Array(total)].map((v, i) => ({
      rowId: i,
      values: columns.map((column) => column.generatorFn()),
    })),
    total,
  }));
}

writeFileSync(
  "./src/Table/mock.json",
  JSON.stringify(transformMetaIntoData(dataSetCollection), null, 4)
);
