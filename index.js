/* jshint esversion: 6 */
(() => {
  'use strict';
  
  const crypto = require('crypto');
  const moment = require('moment');
  
  class VismaSignClientUtils {

    /**
     * Function to create authorization header to the visma sign api
     * 
     * @param {string} clientId - Your clint id
     * @param {string} clientSecret - Your client secret in base64 encoded format
     * @param {string} method - http method, GET, POST, PUT, DELETE
     * @param {object} body - request body in JSON format
     * @param {string} contentType - Content type, must be the same as in request headers
     * @param {date} date - Date that was sent in request headers
     * @param {string} path - The request path
     * @returns {string} A string that can be placed into Authorization - header
     */
    static createAuthorizationHeader(clientId, clientSecret, method, body, contentType, date, path) {
      const bodyHash = VismaSignClientUtils.createBodyHash(JSON.stringify(body));
      const formattedDate = VismaSignClientUtils.formatDate(date);
      const hmacString = [method, bodyHash, contentType, formattedDate, path].join('\n');
      const encrypted = VismaSignClientUtils.encrypt(clientSecret, hmacString);
      return `Onnistuu ${clientId}:${encrypted}`;
    }
    
    /**
     * Function to encrypt data with provided client secret
     * 
     * @param {string} clientSecret - your client secret in base64 format
     * @param {string} data - data to be encrypted
     * @returns {string} Encrypted string in base64 format
     */
    static encrypt(clientSecret, data) {
      const hmac = crypto.createHmac('sha512', Buffer.from(clientSecret, 'base64'));
      return hmac.update(Buffer.from(data, 'utf8')).digest('base64');
    }
    
    /**
     * Function to calculate md5 hash from data
     * 
     * @param {string} data - data to calculate hash from
     * @returns {string} base64 encoded md5 hash
     */
    static createBodyHash(data) {
      return crypto.createHash('md5').update(data).digest('base64');
    }
    
    /**
     * Function to format date in required RFC 2822 format
     * 
     * @param {date} date - date object to be formatted
     * @returns {string} date string in RFC 2822 format
     */
    static formatDate(date) {
      return moment(date).format("ddd, DD MMM YYYY HH:mm:ss ZZ"); 
    }
  }
  
  module.exports = VismaSignClientUtils;
  
})();