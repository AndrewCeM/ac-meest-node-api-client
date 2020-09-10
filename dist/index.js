"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeestApiClient = void 0;
const soapRequest = require("easy-soap-request");
const { toJson } = require("xml2json");
const jsontoxml = require("jsontoxml");
const DEFAULT_REQUEST_TIMEOUT = 5000;
class MeestApiClient {
    constructor(options) {
        this.request = async (xml, options) => {
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
        </soapenv:Envelope>`;
            return soapRequest({
                xml: _xml,
                url: url,
                headers: _headers,
                timeout: options.timeout || this.options.timeout || DEFAULT_REQUEST_TIMEOUT
            }).then((res) => {
                const response = toJson(res.response.body, { object: true });
                return response['soap:Envelope']['soap:Body'];
            }).catch((error) => {
                const errorResponse = toJson(error, { object: true });
                throw errorResponse['soap:Envelope']['soap:Body']['soap:Fault'];
            });
        };
        this.getCityByPostCode = async (postCode) => {
            const xml = `<log:searchCityByPostCode><arg0>${postCode}</arg0></log:searchCityByPostCode>`;
            return this.request(xml, {}).then((res) => {
                return res['ns2:searchCityByPostCodeResponse'].return;
            });
        };
        this.getParcelById = async (parcelId) => {
            const xml = `<log:findParcelById>
            <arg0>${parcelId}</arg0>
            <arg1>${this.options.apiKey}</arg1>
        </log:findParcelById>`;
            return this.request(xml, {}).then((res) => {
                return res['ns2:findParcelByIdResponse'].return;
            });
        };
        this.createParcel = async (payload) => {
            const xml = `<log:createParcel>
            <arg0>${jsontoxml(payload)}</arg0>
            <arg1>${this.options.apiKey}</arg1>
        </log:createParcel>`;
            return this.request(xml, {}).then((res) => {
                return res['ns2:createParcelResponse'].return;
            });
        };
        this.options = options;
    }
}
exports.MeestApiClient = MeestApiClient;
