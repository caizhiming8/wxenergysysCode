const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const authDetection = e => {
  const auth = getApp().globalUserData.AuthDetecte;
  try{
    auth.forEach((item)=> {
      if(item.local_index == e){
        throw 'jumpout';
      }
    });
    return false;
  }catch(e){
    return true;
  }
}

module.exports = {
  formatTime: formatTime,
  authDetection: authDetection
}
