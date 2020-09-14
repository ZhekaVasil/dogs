window.onload = function(){
  start();
};

function fetchDogs() {
  return axios.get('https://dog.ceo/api/breeds/image/random/50');
}

function start () {
  Promise.all([fetchDogs(), fetchDogs(), fetchDogs()])
    .then(function(data) {
      const dogs = data.reduce(function(prev, curr) {
        return prev.concat(curr.data.message)
      }, []);
      showDogs(dogs)
    })
    .catch(function() {
      showErrorMessage()
    })
}

function showDogs(dogs) {
  var win = window;
  var doc = document;
  var docElem = doc.documentElement;
  var body = doc.getElementsByTagName('body')[0];
  var x = win.innerWidth || docElem.clientWidth || body.clientWidth;
  var y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
  dogs.forEach(function(dog, index) {
    var element = document.createElement('img');
    element.classList.add('dog');
    element.style.left = getRandomArbitrary(0, x) + 'px';
    element.style.top = getRandomArbitrary(0, y) + 'px';
    element.style.animationDelay = index + 's';
    element.setAttribute('src', dog);
    element.addEventListener('load', function() {
      imageLoadCallback(element, x, y)
    })
    document.body.appendChild(element)
  })
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function imageLoadCallback(element, x, y) {
  var boundingClientRect = element.getBoundingClientRect();
  if (boundingClientRect.x > x - boundingClientRect.width) {
    element.style.left = x - boundingClientRect.width + 'px';
  }

  if (boundingClientRect.y > y - boundingClientRect.height) {
    element.style.top = y - boundingClientRect.height + 'px';
  }
}

function showErrorMessage() {
  document.getElementById('error').style.display = 'block';
}
