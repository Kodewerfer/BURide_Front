const SERVER_ADDRESS = process.env.burseraddr || "http://localhost:3003";

const URLconfig = {

  USER_ADDRESS: SERVER_ADDRESS + '/user',
  OFFER_ADDRESS: SERVER_ADDRESS + '/offers',
  ORDER_ADDRESS: SERVER_ADDRESS + '/orders'

}


module.exports = URLconfig