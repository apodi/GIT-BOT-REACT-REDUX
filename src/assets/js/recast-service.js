
const fetchAPI =require('./fetchAPI');
module.exports = {
  getIntent : (API_URL,path,reqObj) => {
    return fetchAPI(API_URL,path, {
      method: 'POST',
      body: reqObj,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
      },
    });
  }
}





