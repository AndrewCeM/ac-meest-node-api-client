const soapRequest = require("easy-soap-request");
const { toJson } = require("xml2json");
const jsontoxml = require("jsontoxml");

import { CreateParcelPayload, MeestApiClientOptions, RequestOptions } from "./types";

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
            const response = toJson(res.response.body, { object: true });
            return response['soap:Envelope']['soap:Body'];
        }).catch((error: Error) => {
            const errorResponse = toJson(error, { object: true });
            throw errorResponse['soap:Envelope']['soap:Body']['soap:Fault'];
        });
    }

    getCityByPostCode = async (postCode: string) => {
        const xml = `<log:searchCityByPostCode><arg0>${postCode}</arg0></log:searchCityByPostCode>`

        return this.request(xml, {}).then((res: any) => {
            return res['ns2:searchCityByPostCodeResponse'].return;
        });
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

    createParcel = async (payload: CreateParcelPayload) => {
        const xml = `<log:createParcel>
            <arg0>${jsontoxml(payload)}</arg0>
            <arg1>${this.options.apiKey}</arg1>
        </log:createParcel>`

        return this.request(xml, {}).then((res: any) => {
            return res['ns2:createParcelResponse'].return;
        });
    }
}
