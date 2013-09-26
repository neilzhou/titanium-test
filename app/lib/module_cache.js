var cached_count = 1;

alert('if is singleton, this message will open only once in module cache.js');

var ModuleCache = {
  test: function(){
    cached_count ++;
    return cached_count;
  },
  random: function(){
    return Math.random();
  }
};

module.exports = ModuleCache;
