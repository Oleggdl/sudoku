// module.exports = function solveSudoku(matrix) {

// }
module.exports = function solveSudoku(mas) {
  let mas2 = []
  let kvcenters = [[1, 1], [1, 4], [1, 7], [4, 1], [4, 4], [4, 7], [7, 1], [7, 4], [7, 7]]
  while (true) {
    console.log(mas)
    let b = true
    let check2
    if (!checknull(mas)) return mas
    for (let i = 0; i < mas.length; i++) {
      let masnul = []
      let kol = -1
      for (let j = 0; j < mas[i].length; j++)
        if (mas[i][j] === 0) {
          masnul.push([])
          kol++
          check2 = check(mas, masnul, kol, i, j, kvcenters)
          if (check2 === 1) {
            b = false
            break
          }
          if (check2 === 'Error') {
            return 'Error'
          }
        }
      if (!b) break
      else
        if (checkhard(mas, masnul, i, 0, 'str')) {
          b = false
          break
        }
    }
    if (b)
      for (let j = 0; j < mas[0].length; j++) {
        let masnul = []
        let kol = -1
        for (let i = 0; i < mas.length; i++)
          if (mas[i][j] === 0) {
            masnul.push([])
            kol++
            check2 = check(mas, masnul, kol, i, j, kvcenters)
            if (check2 === 1) {
              b = false
              break
            }
            if (check2 === 'Error') return 'Error'
          }
        if (!b) break
        else
          if (checkhard(mas, masnul, 0, j, 'stolb')) {
            b = false
            break
          }
      }
    if (b)
      for (let k = 0; k < kvcenters.length; k++) {
        let masnul = []
        let kol = -1
        for (let i = kvcenters[k][0] - 1; i <= kvcenters[k][0] + 1; i++) {
          for (let j = kvcenters[k][1] - 1; j <= kvcenters[k][1] + 1; j++)
            if (mas[i][j] === 0) {
              masnul.push([])
              kol++
              check2 = check(mas, masnul, kol, i, j, kvcenters)
              if (check2 === 1) {
                b = false
                break
              }
              if (check2 === 'Error') return 'Error'
            }
          if (!b) break
        }
        if (!b) break
        else
          if (checkhard(mas, masnul, kvcenters[k][0], kvcenters[k][1], 'kv')) {
            b = false
            break
          }
      }
    if (b) {
      let i = checknull(mas)[0]
      let j = checknull(mas)[1]
      let masnul = [[]]
      let check2
      for (let i = 0; i < mas.length; i++) {
        mas2.push([])
        for (let j = 0; j < mas[i].length; j++)
          mas2[i].push(mas[i][j])
      }
      console.log('rec')
      console.log(mas2)
      check(mas, masnul, 0, i, j, kvcenters)
      for (let k = 0; k < masnul[0].length; k++) {
        mas[i][j] = masnul[0][k]
        check2 = solveSudoku(mas)
        if (check2 === 'Error') {
          console.log('er')
          console.log(mas2)
          for (let i = 0; i < mas.length; i++)
            for (let j = 0; j < mas[i].length; j++)
              mas[i][j] = mas2[i][j]
          continue
        }
        return check2
      }
    }
  }
}


function check(mas, masnul, kol, i, j, kvcenters) {
  let masstr = '123456789'
  let masstolb = '123456789'
  let maskv = '123456789'
  for (let k = 0; k < mas[i].length; k++) {
    if (masstr.includes(String(mas[i][k]))) masstr = masstr.replace(String(mas[i][k]), '')
  }
  for (let k = 0; k < mas.length; k++) {
    if (masstolb.includes(String(mas[k][j]))) masstolb = masstolb.replace(String(mas[k][j]), '')
  }
  for (let k = 0; k < kvcenters.length; k++) {
    if ((i === kvcenters[k][0] || i + 1 === kvcenters[k][0] || i - 1 === kvcenters[k][0]) &&
      (j === kvcenters[k][1] || j + 1 === kvcenters[k][1] || j - 1 === kvcenters[k][1]))
      for (let p = kvcenters[k][0] - 1; p <= kvcenters[k][0] + 1; p++)
        for (let l = kvcenters[k][1] - 1; l <= kvcenters[k][1] + 1; l++)
          if (maskv.includes(String(mas[p][l]))) maskv = maskv.replace(String(mas[p][l]), '')
  }
  for (let k = 0; k < masstr.length; k++) {
    if (masstolb.includes(masstr[k]) && maskv.includes(masstr[k])) masnul[kol].push(parseInt(masstr[k], 10))
  }
  //console.log(masnul[kol])
  if (masnul[kol].length === 0) return 'Error'
  if (masstr.length === 1) {
    mas[i][j] = parseInt(masstr[0], 10)
    return 1
  }
  if (masstolb.length === 1) {
    mas[i][j] = parseInt(masstolb[0], 10)
    return 1
  }
  if (maskv.length === 1) {
    mas[i][j] = parseInt(maskv[0], 10)
    return 1
  }
  if (masnul[kol].length === 1) {
    mas[i][j] = masnul[kol][0]
    return 1
  }
  return false
}

function checkhard(mas, masnul, i, j, str) {
  if (masnul.length === 0) return false
  let str1 = '123456789'
  let maspoisk = []
  let kolnull = -1
  let isOne = 0
  for (let k = 0; k < masnul.length; k++)
    for (let p = 0; p < masnul[k].length; p++)
      maspoisk.push(masnul[k][p])
  //console.log(maspoisk)
  for (let k = 0; k < str1.length; k++) {
    for (let p = 0; p < maspoisk.length; p++)
      if (str1[k] === String(maspoisk[p])) isOne++
    if (isOne === 1) {
      for (let k1 = 0; k1 < masnul.length; k1++)
        for (let p1 = 0; p1 < masnul[k1].length; p1++)
          if (String(masnul[k1][p1]) === str1[k]) {
            //console.log('str1[k]')
            //console.log(str1[k])
            //console.log('masnul[k1][p1]')
            //console.log(masnul[k1][p1])
            if (str === 'str')
              for (let k2 = 0; k2 < mas.length;

                k2++) {
                if (mas[i][k2] === 0) kolnull++
                if (kolnull === k1) {
                  mas[i][k2] = masnul[k1][p1]
                  return true
                }
              }
            if (str === 'stolb')
              for (let k2 = 0; k2 < mas[0].length; k2++) {
                if (mas[k2][j] === 0) kolnull++
                if (kolnull === k1) {
                  mas[k2][j] = masnul[k1][p1]
                  return true
                }
              }
            if (str === 'kv')
              for (let p = i - 1; p <= i + 1; p++)
                for (let l = j - 1; l <= j + 1; l++) {
                  if (mas[p][l] === 0) kolnull++
                  if (kolnull === k1) {
                    mas[p][l] = masnul[k1][p1]
                    return true
                  }
                }

          }
    }
    else isOne = 0
  }
  return false
}


function checknull(mas) {
  for (let i = 0; i < mas.length; i++)
    for (let j = 0; j < mas[i].length; j++)
      if (mas[i][j] === 0) return [i, j]
  return false
}