
'use strict';

const { default: axios } = require("axios");
const { okResponse, errorResponse } = require('../utils/HttpResponse')
const { HOME_JUNCTION_HEADERS, ATTOM_DATA_HEADERS } = require('../utils/constants')
const { forEach } = require('../utils/functions')


module.exports = async (event, context, callback) => {
    // const keyword = event.queryStringParameters && event.queryStringParameters.keyword ? event.queryStringParameters.keyword : ' ';

    console.log('event.queryStringParameters.keyword---', event.queryStringParameters.keyword);
    const header2 = {
        headers: ATTOM_DATA_HEADERS
    };

    return await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${event.queryStringParameters.keyword}`, header2)
        .then((res) => {
            return okResponse({
                listing: res.data
            })
        })
        .catch(err => {
            return [
                console.log('error', err),
                console.info('error', err),
                console.warn('error', err),
                errorResponse()
            ]
        });


    // return await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${keyword}`, header2)
    //     .then(async res => {
    //         let listing = [];
    //         await forEach(res.data.property, async (each) => {
    //             if (each.address.oneLine) {
    //                 await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?address=${(each.address.line1 ? each.address.line1 : "")}${(each.address.locality ? ("," + each.address.locality) : "")}${(each.address.countrySubd ? ("," + each.address.countrySubd) : "")}`, header2)
    //                     .then(async ress => {
    //                         if (ress.data.property && ress.data.property[0]) {
    //                             each = { ...each, attomData: ress.data.property[0] }
    //                         }
    //                     })
    //                     .catch(err => {
    //                         console.log('error',err);
    //                     })
    //                 await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/saleshistory/expandedhistory?address=${(each.address.line1 ? each.address.line1 : "")}${(each.address.locality ? ("," + each.address.locality) : "")}${(each.address.countrySubd ? ("," + each.address.countrySubd) : "")}`, header2)
    //                     .then(async ress => {
    //                         if (ress.data.property && ress.data.property[0]) {
    //                             each = { ...each, attomData: { ...each.attomData, ...ress.data.property[0] } }
    //                         }
    //                     }).catch(err => {
    //                         console.log('error',err);
    //                     })
    //             }
    //             listing.push(each);
    //             return okResponse({
    //                 listing: listing
    //             })
    //         })
    //     }).catch(err => {
    //         return [
    //             console.log('error',err),
    //             console.info('error',err),
    //             console.warn('error',err),
    //             errorResponse()
    //         ]
    //     });


    // return await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${moreQueryStrings}`, header)
    //     .then(async res => {
    //         let listing = [];
    //         await forEach(res.data.result.listings, async (each) => {
    //             if (each.stdAddress) {
    //                 console.log('each', each);
    //                 await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?address=${(each.stdAddress.deliveryLine ? each.stdAddress.deliveryLine : "")}${(each.stdAddress.city ? ("," + each.stdAddress.city) : "")}${(each.stdAddress.state ? ("," + each.stdAddress.state) : "")}`, header2)
    //                     .then(async ress => {
    //                         if (ress.data.property && ress.data.property[0]) {
    //                             each = { ...each, attomData: ress.data.property[0] }
    //                         }
    //                     })
    //                     .catch(err => {

    //                     })
    //                 await axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/saleshistory/expandedhistory?address=${(each.stdAddress.deliveryLine ? each.stdAddress.deliveryLine : "")}${(each.stdAddress.city ? ("," + each.stdAddress.city) : "")}${(each.stdAddress.state ? ("," + each.stdAddress.state) : "")}`, header2)
    //                     .then(async ress => {
    //                         if (ress.data.property && ress.data.property[0]) {
    //                             each = { ...each, attomData: { ...each.attomData, ...ress.data.property[0] } }
    //                         }
    //                     }).catch(err => {

    //                     })
    //             }
    //             listing.push(each)
    //         });
    //         if (listing) {
    //             return okResponse({
    //                 listing: listing
    //             })
    //         } else {
    //             return await axios.get(`https://slipstream.homejunction.com/ws/listings/search?pageNumber=${pageNumber}&pageSize=50${moreQueryStrings}`, header)
    //                 .then(async res => {
    //                     let listing = [];
    //                     await forEach(res.data.result.listings, async (each) => {
    //                         listing.push({
    //                             id: each.id,
    //                             systemId: each.systemId,
    //                             market: each.market,
    //                             geoType: each.geoType,
    //                             coordinates: each.coordinates,
    //                             listPrice: each.listPrice,
    //                             beds: each.beds,
    //                             address: eachpropertiesListing.address,
    //                             images: each.images,
    //                             baths: each.baths,
    //                             lotSize: each.lotSize,
    //                             listingType: each.listingType,
    //                             daysOnHJI: each.daysOnHJI
    //                         })
    //                     });
    //                     return okResponse({
    //                         currentPage: pageNumber,
    //                         totalPages: Math.ceil(res.data.result.total / 50),
    //                         total: res.data.result.total,
    //                         listing: listing
    //                     })
    //                 }).catch(() => {
    //                     return errorResponse();
    //                 });
    //         }

    //     }).catch((err) => {
    //         return errorResponse();
    //     })


    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

// return await axios.get(`https://slipstream.homejunction.com/ws/listings/search?pageNumber=${pageNumber}&pageSize=50${moreQueryStrings}`, header)
//     .then(async res => {
//         let listing = [];
//         await forEach(res.data.result.listings, async (each) => {
//             listing.push({
//                 id: each.id,
//                 systemId: each.systemId,
//                 market: each.market,
//                 geoType: each.geoType,
//                 coordinates: each.coordinates,
//                 listPrice: each.listPrice,
//                 beds: each.beds,
//                 address: each.address,
//                 images: each.images,
//                 baths: each.baths,
//                 lotSize: each.lotSize,
//                 listingType: each.listingType,
//                 daysOnHJI: each.daysOnHJI
//             })
//         });
//         return okResponse({
//             currentPage: pageNumber,
//             totalPages: Math.ceil(res.data.result.total / 50),
//             total: res.data.result.total,
//             listing: listing
//         })
//     }).catch(() => {
//         return errorResponse();
//     })