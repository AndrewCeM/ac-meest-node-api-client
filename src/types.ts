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
    street?: string;
    postCode?: string;
    postOffice?: string;
    notice?: string;
}

interface DeliveryAddress {
    name: string;
    cityIdRef: string;
    city: string;
    house: string;
    phone: string;
    country: string;
    street?: string;
    postCode?: string;
    postOffice?: string;
    notice?: string;
}

export type DeliveryTypeEnum = "COURRIER" | "SERVICE_POINT" | "POSTAL_SERVICE_APT" | "MEEST_PARTNER_PICKUP_POINT_NP" | "MEEST_PARTNER_PICKUP_POINT_UP";

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
    deliveryTypeEnum: DeliveryTypeEnum;
    divisionIDRRef?: string // is required for SERVICE_POINT | MEEST_PARTNER_PICKUP_POINT_NP | MEEST_PARTNER_PICKUP_POINT_UP
    deliveryAddress: DeliveryAddress;
}

export type DivisionType = "DIVISION" | "DIVISION_PICKPOINT" | "POSTSTATION" | "PICK_STATION" | "MEEST_PARTNER_PICKUP_POINT_NP" | "MEEST_PARTNER_PICKUP_POINT_UP";


export interface GetDivisionsPayload {
    cityIdRef: string;
    divisionType: DivisionType
}
