const soapRequest = require("easy-soap-request");
const convert = require('xml-js');

import {
    CreateParcelPayload,
    GetDivisionsPayload,
    MeestApiClientOptions,
    RequestOptions,
    GetStreetByNameAndCityIdRefPayload
} from "./types";
import { xml2jsonOptions } from "./helper";

const DEFAULT_REQUEST_TIMEOUT = 5000;

export class MeestApiClient {
    public options: MeestApiClientOptions;

    constructor(options: MeestApiClientOptions) {
        this.options = options;
    }

    request = async (xml: string, options: Partial<RequestOptions>) => {
        const { url } = this.options;
        const _headers = {
            ...(options.headers || {}),
            'Content-Type': 'text/xml;charset=UTF-8'
        };

        const _xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="http://logic.meestgroup.com/">
            <soapenv:Header/>
            <soapenv:Body>
               ${xml}
            </soapenv:Body>
        </soapenv:Envelope>`

        return soapRequest({
            xml: _xml,
            url: url,
            headers: _headers,
            timeout: options.timeout || this.options.timeout || DEFAULT_REQUEST_TIMEOUT
        }).then((res: any) => {
            const response = convert.xml2js(res.response.body, xml2jsonOptions);
            return response['soap:Envelope']['soap:Body'];
        }).catch((error: Error) => {
            const errorResponse = convert.xml2js(error, xml2jsonOptions);
            throw errorResponse['soap:Envelope']['soap:Body']['soap:Fault'];
        });
    }

    getCityByPostCode = async (postCode: string) => {
        const xml = `<log:searchCityByPostCode><arg0>${postCode}</arg0></log:searchCityByPostCode>`

        return this.request(xml, {}).then((res: any) => {
            return res['ns2:searchCityByPostCodeResponse'].return;
        });
    }

    getStreetByNameAndCityIdRef = async ({ street, cityIdRef }: GetStreetByNameAndCityIdRefPayload ) => {
        const xml = `<log:searchStreetByNameAndCityIdRef>
            <arg0>${cityIdRef}</arg0>
            <arg1>${street}</arg1>
        </log:searchStreetByNameAndCityIdRef>`;

        return this.request(xml, {}).then((res: any) => {
            return res['ns2:searchStreetByNameAndCityIdRefResponse'].return;
        })
    }

    getParcelById = async (parcelId: string) => {
        const xml = `<log:findParcelById>
            <arg0>${parcelId}</arg0>
            <arg1>${this.options.apiKey}</arg1>
        </log:findParcelById>`
        return this.request(xml, {}).then((res: any) => {
            return res['ns2:findParcelByIdResponse'].return;
        });
    }

    getDivisions = async ({ cityIdRef, divisionType }: GetDivisionsPayload) => {
        const xml = ` <log:searchDivisions>
            <arg0>${cityIdRef}</arg0>
            <arg1>${divisionType}</arg1>
        </log:searchDivisions>`;

        return this.request(xml, {}).then((res: any) => {
            return res['ns2:searchDivisionsResponse'].return;
        });
    }

    createParcel = async (payload: CreateParcelPayload) => {
        const xml = `<log:createParcel>
            <arg0>${convert.js2xml(payload, { compact: true })}</arg0>
            <arg1>${this.options.apiKey}</arg1>
        </log:createParcel>`

        return this.request(xml, {}).then((res: any) => {
            return res['ns2:createParcelResponse'].return;
        });
    }
}
