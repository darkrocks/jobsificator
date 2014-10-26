'use strict';

describe('jobsificator.presentation-viewer module', function () {
  var $compile;
  var $rootScope;
  var $httpBackend;
  var requestHandler;
  var element;
  var scope;
  var mockPresentation = {
    id: "1", name: "Because of Winn-Dixie", slidesCount: 50
  , slides:
    [
            "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 853 480'><g><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_1' y='220' x='176' stroke-width='0' stroke='#000000' fill='#000000'/><text transform='matrix(2.100371837615967,0,0,2.100371837615967,-94.56320479512215,-126.54276132583618) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_2' y='174.136282' x='256.651324' stroke-width='0' stroke='#000000' fill='#3f3f3f'>Lorem ipsum dolor sit amet</text><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_3' y='316' x='446' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Aliquam molestie, libero quis interdum tempus, mi leo ullamcorper</text></g>",
            "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 853 480'><g><path id='svg_2' d='m309.103394,255.490448l105.618042,-52.337738v-30.902832h-11.909867c-5.912094,0 -11.538588,-1.199557 -16.665255,-3.384463v16.55102l-105.618042,52.366276v41.584614h28.56085v-23.876876zm282.061757,23.88092v-41.598881l-105.618042,-52.352013v-16.536728c-5.112391,2.170625 -10.753161,3.370177 -16.650982,3.370177h-11.881306l-0.01428,30.902832l105.618042,52.352013v23.876863h28.546568zm-140.983307,-0.014264v-107.117462h-28.56085v107.117462h28.56085zm159.723236,14.284424h-66.023254c-15.765589,0 -28.56085,12.795255 -28.56085,28.56085v66.050051c0,15.765589 12.795255,28.56085 28.56085,28.56085h66.046959c15.765589,0 28.56085,-12.795255 28.56085,-28.56085v-66.046959c0.001017,-15.762611 -12.810934,-28.563942 -28.584555,-28.563942zm-282.006775,0h-66.070557c-15.765589,0 -28.56085,12.795255 -28.56085,28.56085v66.050051c0,15.765589 12.795255,28.56085 28.56085,28.56085h66.046959c15.765589,0 28.56085,-12.795255 28.56085,-28.56085v-66.046959c0.006601,-15.762611 -12.805166,-28.563942 -28.537252,-28.563942zm74.953308,-135.666245h66.070953c15.765589,0 28.56085,-12.795255 28.56085,-28.56085v-66.040316c0,-15.765589 -12.795255,-28.56085 -28.56085,-28.56085h-66.046959c-15.765589,0 -28.56085,12.795255 -28.56085,28.56085v66.046959c-0.007212,15.762749 12.763876,28.554207 28.536856,28.554207zm66.070953,135.666245h-66.046959c-15.765589,0 -28.56085,12.795255 -28.56085,28.56085v66.050051c0,15.765589 12.795255,28.56085 28.56085,28.56085h66.046959c15.765589,0 28.56085,-12.795255 28.56085,-28.56085v-66.046959c-0.017363,-15.762611 -12.828794,-28.563942 -28.56085,-28.563942z' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#007fff'/><text transform='matrix(1.6245933771133423,0,0,1.6245933771133423,-237.33572403155267,-36.22641587257385) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_3' y='87.386464' x='414.464157' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#ffffff'>Duis</text><text transform='matrix(1.3664758205413818,0,0,1.3664758205413818,-89.78084984794259,-117.63873839378357) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_4' y='356.904381' x='282.318095' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#ffffff'>Morbi</text><text transform='matrix(1.5117075443267822,0,0,1.5117075443267822,-200.4054624773562,-165.79324436187744) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_5' y='354.599547' x='422.307518' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#ffffff'>Nulla</text><text transform='matrix(1.6186616245342538,0,0,1.6186616245342538,-295.22129260239507,-190.6606114729621) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_6' y='348.471177' x='539.471177' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#ffffff'>Sed</text></g>",
            "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 853 480'><g><text transform='matrix(1.2212194204330444,0,0,2.1481480598449707,20.73586411215365,4.592592239379883) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_6' y='30.568966' x='216.39366' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'/><path id='svg_7' d='m331.445007,211.828873c0,21.227646 -49.24881,38.44664 -110,38.44664m110,-38.44664l0,0c0,21.227646 -49.24881,38.44664 -110,38.44664c-60.752029,0 -110,-17.218994 -110,-38.44664m0,0l0,0c0,-21.234283 49.247971,-38.445541 110,-38.445541c60.75119,0 110,17.211258 110,38.445541l0,153.777023c0,21.234344 -49.24881,38.445618 -110,38.445618c-60.752029,0 -110,-17.211273 -110,-38.445618l0,-153.777023z' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#aad4ff'/><path id='svg_8' d='m777.335022,212.85965c0,21.75589 -51.934875,39.389954 -116,39.389954m116,-39.389954l0,0c0,21.75589 -51.934875,39.389954 -116,39.389954c-64.065125,0 -116,-17.634064 -116,-39.389954m0,0l0,0c0,-21.753998 51.934875,-39.386307 116,-39.386307c64.065125,0 116,17.632309 116,39.386307l0,157.558014c0,21.751923 -51.934875,39.389893 -116,39.389893c-64.065125,0 -116,-17.63797 -116,-39.389893z' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#aad4ff'/><path id='svg_9' d='m351.998352,297.004395l51.075714,-52.499985l0,26.249985l74.022064,0l0,-26.249985l51.075684,52.499985l-51.075684,52.5l0,-26.25l-74.022064,0l0,26.25l-51.075714,-52.5z' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#aad4ff'/><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_10' y='116' x='401' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'/><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_11' y='320' x='222' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Aliquam</text><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_12' y='304' x='438' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Curabitur</text><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_13' y='321' x='668' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Pellentesque</text><text transform='matrix(1.6541568040847778,0,0,1.6541568040847778,26.472908165305853,-39.24940824508667) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_14' y='89.254451' x='252.108557' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Curabitur scelerisque posuere urna</text></g>",
            "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 853 480'><g><path id='svg_1' d='m497.768555,149.242844v230.162796h76.228958v-230.162796h-76.228958zm-105.543549,230.162796h76.228958v-280.000015h-76.228958v280.000015zm-105.543762,0h76.228958v-180.308655h-76.228958v180.308655z' stroke-width='5' stroke='#000000' fill='#aad4ff'/><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_3' y='429' x='325' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>2012</text><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_4' y='428' x='540' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>2014</text><text xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_5' y='429' x='432' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>2013</text><text transform='matrix(1.2212194204330444,0,0,2.1481480598449707,20.73586411215365,4.592592239379883) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_6' y='30.568966' x='216.39366' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'/><text transform='matrix(1.374843955039978,0,0,1.374843955039978,18.642629826441407,-13.869226336479187) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_7' y='63.364132' x='295.566173' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Nullam sit amet euismod tortor</text></g>"
            , "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 853 480'><g><ellipse ry='106' rx='185' id='svg_1' cy='134' cx='203' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#aad4ff'/><ellipse ry='98' rx='182' id='svg_4' cy='120' cx='636' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#ffd4aa'/><ellipse ry='99' rx='177' id='svg_5' cy='355' cx='442' stroke-linecap='null' stroke-linejoin='null' stroke-width='5' stroke='#000000' fill='#bfbfbf'/><text transform='matrix(1.9368900060653684,0,0,1.9368900060653684,88.2234867978841,-88.75211060047148) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_7' y='121' x='59' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Sed hendrerit</text><text transform='matrix(1.7941235303878784,0,0,1.7941235303878784,-355.20897350646555,-67.50050008296967) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_8' y='111.459002' x='546.065508' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Duis ac massa</text><text transform='matrix(1.7496252059936523,0,0,1.7496252059936523,-186.3755668401718,-245.12744235992432) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_9' y='353.572408' x='358.862896' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>Cras accumsan</text></g>"
            , "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 853 480'><g><text transform='matrix(1.8812443017959593,0,0,1.8812443017959593,164.4132669754326,-101.88691878318785) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_9' y='143.136271' x='105.827157' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>- Quisque rhoncus libero augue</text><text transform='matrix(1.849444270133972,0,0,1.849444270133972,231.3994519356638,-152.44830143451688) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_10' y='221.761792' x='103.058277' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>- Suspendisse maximus condimentum</text><text transform='matrix(1.8059701919555664,0,0,1.8059701919555664,59.44030165672302,-230.507474899292) ' xml:space='preserve' text-anchor='middle' font-family='Sans-serif' font-size='24' id='svg_11' y='319.07438' x='142.338841' stroke-linecap='null' stroke-linejoin='null' stroke-width='0' stroke='#000000' fill='#000000'>- Sed commodo ante metus</text></g>"
    ]
  };

  beforeEach(module('jobsificator.presentation-viewer'));
  beforeEach(module('templates'));
  beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = angular.element('<presentation-viewer presentation="presentation"></presentation-viewer>');
  }));

  describe('jobsificator.presentation-viewer directive', function () {
    it('should throw an error when presentation slides are undefined', function () {
      scope = $rootScope.$new();
      scope.presentation = {
        slides: undefined
      };

      expect(function () {
        $compile(element)(scope);
        scope.$apply();
      }).toThrow(new Error('Wrong presentation format'));

      scope.presentation = {
        slides: []
      };

      expect(function () {
        $compile(element)(scope);
        scope.$apply();
      }).toThrow(new Error('Wrong presentation format'));
    });
  });

  describe('jobsificator.presentation-viewer directive', function () {
    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
      scope = $rootScope.$new();
      scope.presentation = mockPresentation;
      $compile(element)(scope);
      scope.$apply();
    }));

    it('should disable prev and next slide buttons depending on selected slide', function () {
      var nextBtn = element.find('.presentation-viewer-navbar .next-slide-btn');
      var prevBtn = element.find('.presentation-viewer-navbar .prev-slide-btn');
      expect(prevBtn.attr('disabled')).toBe('disabled');
      expect(nextBtn.attr('disabled')).not.toBe('disabled');
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      expect(nextBtn.attr('disabled')).toBe('disabled');
      expect(prevBtn.attr('disabled')).not.toBe('disabled');
    });
  });
});