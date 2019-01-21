export function winRatio(modulo, betMaskDisplay){
  if (modulo == 2) {
      return 0.5
  } else if (modulo == 6) {
      let arr = betMaskDisplay.split(',');
      return arr.length / modulo;
  } else if (modulo == 36) {
      let n_arr = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
      let d_arr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      let arr = betMaskDisplay.split(',');
      let sum = 0;
      for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < d_arr.length; j++) {
              if (arr[i] == d_arr[j]) {
                  sum += n_arr[j];
                  break;
              }
          }
      }
      return sum / modulo;
  } else if (modulo == 100) {
      return betMaskDisplay / modulo;
  }
}

export function getmodulo(gameId){
    let value
    switch (gameId) {
      case '1':
        value = 2
        break
      case '2':
        value = 6
        break
      case '3':
        value = 36
        break
      case '4':
        value = 100
        break
      default:
        value = ''
    }
    return value
}

export function checkNet(networkId) {
  let networkType
  switch (networkId) {
    case 1:
      networkType = 'Main net'
      break
    case 3:
      networkType = 'Ropsten test net'
      break
    case 4:
      networkType = 'Rinkeby test net'
      break
    case 42:
      networkType = 'Kovan test net'
      break
    default:
      networkType = 'Unknown net'
  }
  return networkType
}

export function checkNetUrl(networkId) {
    let networkUrl
    switch (networkId) {
        case 1:
            networkUrl = 'https://etherscan.io'
            break
        case 3:
            networkUrl = 'https://ropsten.etherscan.io'
            break
        case 4:
            networkUrl = 'https://rinkeby.etherscan.io'
            break
        case 42:
            networkUrl = 'https://kovan.etherscan.io'
            break
        default:
            networkUrl = 'https://etherscan.io'
    }
    return networkUrl
}