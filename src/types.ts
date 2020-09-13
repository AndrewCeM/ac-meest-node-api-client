import { OutgoingHttpHeaders } from "http";

export interface RequestOptions {
    headers: OutgoingHttpHeaders;
    timeout: number;
}

export interface MeestApiClientOptions {
    apiKey: string;
    url: string;
    timeout: number;
    headers?: OutgoingHttpHeaders
}

interface ParcelPositionApiBeans {
    count: string;
    countryCode: string;
    customCode: string;
    countryValue: string;
    name: string;
    nameUk: string;
    productEan: string;
    productSize: string;
    value: string;
    valueUah: string;
    weight: string;
    countryCurrencyName: string;
}

interface RecipentAddress {
    name: string;
    cityIdRef: string;
    city: string;
    house: string;
    phone: string;
    country: string;
    street: string;
}

interface deliveryAddress {
    name: string;
    cityIdRef: string;
    city: string;
    house: string;
    phone: string;
    country: string;
}

export interface CreateParcelPayload {
    parcelNumberInternal: string,
    weight: string;
    value: string;
    summaCodEur: string;
    summaCodUah: string;
    receiverName: string;
    currencyName: string;
    countryValue: string;
    receiverEmail: string;
    deliveryCostEur: string;
    deliveryCostCountryValue: string;
    parcelPositionApiBeans: ParcelPositionApiBeans[];
    recipentAddress: RecipentAddress;
    deliveryTypeEnum: string;
    deliveryAddress: deliveryAddress;
}
