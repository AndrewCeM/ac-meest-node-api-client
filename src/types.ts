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
    countryValue?: string; // @todo check meest api - possibly removed
    name: string;
    nameUk: string;
    productEan: string;
    productSize: string;
    value: string;
    valueUah: string;
    weight: string;
    countryCurrencyName?: string; // @todo check meest api - possibly removed
}

interface RecipentAddress {
    name: string;
    cityIdRef: string;
    city: string;
    house: string;
    apartment?: string;
    phone: string;
    country: string;
    street?: string;
    streetIdRef: string;
    postCode?: string;
    postOffice?: string;
    notice?: string;
}

interface DeliveryAddress {
    name: string;
    cityIdRef: string;
    city: string;
    house: string;
    apartment?: string;
    phone: string;
    country: string;
    street?: string;
    streetIdRef: string;
    postCode?: string;
    postOffice?: string;
    notice?: string;
}

export type DeliveryTypeEnum = "COURRIER" | "SERVICE_POINT" | "POSTAL_SERVICE_APT" | "MEEST_PARTNER_PICKUP_POINT_NP" | "MEEST_PARTNER_PICKUP_POINT_UP";

export interface CreateParcelPayload {
    parcelNumberInternal: string,
    parcelNumber: string,
    zaUa: string;
    weight: string;
    value: string;
    summaCodEur: string;
    summaCodUah: string;
    receiverName: string;
    currencyName: string;
    countryValue?: string; // @todo check meest api - possibly removed
    receiverEmail: string;
    deliveryCostEur?: string;// @todo check meest api - possibly removed
    deliveryCostCountryValue?: string;// @todo check meest api - possibly removed
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

export interface GetStreetByNameAndCityIdRefPayload {
    street: string;
    cityIdRef: string;
}
