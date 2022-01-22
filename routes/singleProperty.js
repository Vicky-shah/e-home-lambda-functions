
'use strict';

const { default: axios } = require("axios");
const { okResponse, errorResponse } = require('../utils/HttpResponse')
const { HOME_JUNCTION_HEADERS, ATTOM_DATA_HEADERS } = require('../utils/constants')
const { forEach } = require('../utils/functions')

module.exports = async (event, context, callback) => {
    let moreQueryStrings = "";
    const id = event.queryStringParameters && event.queryStringParameters.id ? event.queryStringParameters.id : ' ';
    if (event.queryStringParameters) {
        Object.keys(event.queryStringParameters).forEach(each => {
            moreQueryStrings += "&" + each + "=" + event.queryStringParameters[each];
        })
    }
    const header = {
        headers: HOME_JUNCTION_HEADERS
    };
    const header2 = {
        headers: ATTOM_DATA_HEADERS
    };
    // return await axios.get(`https://slipstream.homejunction.com/ws/listings/get?${moreQueryStrings}`, header)
    return await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=${id}`, header2)
        .then(async res => {
            let listing = [];
            await forEach(res.data.property, async (each) => {
                if (each.address.line1) {
                    await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?address1=${(each.address.line1 ? each.address.line1 : "")}&address2=${(each.address.line2 ? each.address.line2 : "")}`, header2)
                        .then(async ress => {
                            if (ress.data.property && ress.data.property[0]) {
                                each = { ...each, attomData: ress.data.property[0] }
                            }
                        })
                        .catch(err => {

                        })
                    await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/saleshistory/expandedhistory?address1=${(each.address.line1 ? each.address.line1 : "")}&address2=${(each.address.line2 ? each.address.line2 : "")}`, header2)
                        .then(async ress => {
                            if (ress.data.property && ress.data.property[0]) {
                                each = { ...each, attomData: { ...each.attomData, ...ress.data.property[0] } }
                            }
                        }).catch(err => {

                        })
                    await axios.get(`https://slipstream.homejunction.com/ws/listings/get&id=${id}&images=true&market=cjmls`, header)
                        .then(async res => {
                            if (res.data.result.listings && res.data.result.listings[0]) {
                                each = { ...each, slipStreem: { ...each.attomData, ...res.data.result.listings[0]} }
                            }
                        }).catch(err => {

                        })
                }
                listing.push(each)
            });
            return okResponse({
                listing: listing
            })
        }).catch((err) => {
            return errorResponse();
        })
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

// return await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?address=${(each.stdAddress.deliveryLine ? each.stdAddress.deliveryLine : "")}${(each.stdAddress.city ? ("," + each.stdAddress.city) : "")}${(each.stdAddress.state ? ("," + each.stdAddress.state) : "")}`, header2)
// .then(async res => {
//     let listing = [];
//     await forEach(res.data.property, async (each) => {
//         if (each) {
//             const header2 = {
//                 headers: ATTOM_DATA_HEADERS
//             };
//             await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/saleshistory/expandedhistory?address=${(each.stdAddress.deliveryLine ? each.stdAddress.deliveryLine : "")}${(each.stdAddress.city ? ("," + each.stdAddress.city) : "")}${(each.stdAddress.state ? ("," + each.stdAddress.state) : "")}`, header2)
//                 .then(async ress => {
//                     if (ress.data.property && ress.data.property[0]) {
//                         each = { ...each, attomData: ress.data.property[0] }
//                     }
//                 })
//                 .catch(err => {

//                 })
//                 await axios.get(`https://slipstream.homejunction.com/ws/listings/get?${moreQueryStrings}`, header2)
//                 .then(async ress => {
//                     if (ress.data.result.listings && ress.data.result.listings) {
//                         each = { ...each, attomData: { ...each.attomData, ...ress.data.property[0] } }
//                     }
//                 }).catch(err => {

//                 })
//         }
//         listing.push(each)
//     });
//     return okResponse({
//         listing: listing
//     })
// }).catch((err) => {
//     return errorResponse();
// })