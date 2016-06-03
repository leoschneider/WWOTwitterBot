# worldweatheronline.com api wrapper for node.js
If you want more information about capabilities of worldweatheronline's API capabilities
please take a look at http://developer.worldweatheronline.com

## Usage

include weather package into your app. and initialise configuration

    var weather = require('weatherapi');
    weather.config({api_key: 'your secret api key goes here'});
   
Get forecast for the location noted in first param. 

    weather.forecast('london', {cc:'yes'}, function(err,result){
      if (err) console.log(err);
      console.log(result);
    });

Search for available weather locations.

    weather.search(query, options, cb);

For more information please take a look at http://developer.worldweatheronline.com/
Also for available options you can always scour through comments in code.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
