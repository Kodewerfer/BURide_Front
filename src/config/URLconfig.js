
let addr = ''

if (window.location.hostname === 'localhost') {
  addr = 'http://localhost:3004';
} else {
  addr = "http://165.22.239.143:3004";
}

console.log(window.location.hostname);
console.log('server address:' + addr);

const SERVER_ADDRESS = addr;

const URLconfig = {

  USER_ADDRESS: SERVER_ADDRESS + '/user',
  OFFER_ADDRESS: SERVER_ADDRESS + '/offers',
  ORDER_ADDRESS: SERVER_ADDRESS + '/orders'

}


module.exports = URLconfig