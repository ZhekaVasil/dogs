window.onload = function(){
  start();
};

function fetchDogs() {
  return axios.get('https://dog.ceo/api/breeds/image/random/50');
}

function start () {
  loadDogs();
  handleAudio();
}

function handleAudio() {
  var audio = document.getElementById('audio');
  var audioButton = document.getElementById('audio_button')
  audioButton.addEventListener('click', function (event) {
    if (audio.duration > 0 && !audio.paused) {
      audio.pause()
      audioButton.classList.remove('on');
      audioButton.classList.add('off');
    } else {
      audio.play();
      audioButton.classList.remove('off');
      audioButton.classList.add('on');
    }
  })
}

function loadDogs() {
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


function getScreenDimensions() {
  var win = window;
  var doc = document;
  var docElem = doc.documentElement;
  var body = doc.getElementsByTagName('body')[0];
  var x = win.innerWidth || docElem.clientWidth || body.clientWidth;
  var y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

  return {x,y}
}

function showDog(src) {
  var dimensions = getScreenDimensions();
  var element = document.createElement('img');
  element.classList.add('dog');
  element.style.left = getRandomArbitrary(0, dimensions.x) + 'px';
  element.style.top = getRandomArbitrary(0, dimensions.y) + 'px';
  element.setAttribute('src', src);
  element.addEventListener('load', function() {
    imageLoadCallback(element, dimensions.x, dimensions.y)
  })
  document.body.appendChild(element)
}

function showDogs(dogs) {

  dogs.forEach(function(dog, index) {
    setTimeout(function () {
      showDog(dog);
    }, (index + 1) * 1000)
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

  if (boundingClientRect.x <= 100) {
    element.style.left = 0 + 'px';
  }

  if (boundingClientRect.y > y - boundingClientRect.height) {
    element.style.top = y - boundingClientRect.height + 'px';
  }

  if (boundingClientRect.y <= 100) {
    element.style.top = 0 + 'px';
  }

  element.style.opacity = '1';
}

function showErrorMessage() {
  document.getElementById('error').style.display = 'block';
}
