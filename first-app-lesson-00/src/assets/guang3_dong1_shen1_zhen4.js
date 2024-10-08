!(function (B, A) {
  'function' == typeof define && define.amd
    ? define(['exports', 'echarts'], A)
    : 'object' == typeof exports && 'string' != typeof exports.nodeName
      ? A(exports, require('echarts'))
      : A({}, B.echarts);
})(this, function (B, A) {
  var D = function (B) {
    'undefined' != typeof console &&
      console &&
      console.error &&
      console.error(B);
  };
  return A
    ? A.registerMap
      ? void A.registerMap('深圳', {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: '440303',
              properties: {
                name: '罗湖区',
                cp: [114.131459, 22.548389],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@@CA@@A@@AA@@AAA@@@AA@@@C@@@A@@A@@@A@@AA@@@@@@@AA@A@@AA@@@@@A@A@AB@@@B@@@B@B@B@B@B@@A@@@AA@AA@@@A@ABA@A@@@AAA@A@@B@D@@@B@@@@@D@B@B@B@@@B@D@B@DAFB@@@A@@F@B@B@B@B@@B@@@@@@@@@@@@@@B@@@@@B@@@@@@@@@B@@@@@@@B@@@@@@@@@B@@A@B@@B@@@@@@@@@B@@@B@@@@@@@@@B@@@@@B@@@@@B@@@B@@@@A@@@@@@@@@AAA@@@@AA@C@@@@AA@A@A@A@A@AA@@A@@@@@@@@@@@@@@B@@@@@@@@@@A@@B@@@@@@@B@@@@A@@@@B@@@@@@A@@B@@A@@@@@@@@B@@@@@@@@A@@@A@@@@@@@A@@@@@@@A@@@@@@@@@A@@@@@@@@@A@@@@@@@@@A@@@@@@@A@@@@@@@@@@@@AA@@@@@@@@@A@@@@@@@@@@@@@AB@@@@@@@@@@@B@@@@@@@@@@AB@@@@@@@@@@@@@@A@@B@@@@@BAD@@@@@@@@@@@@@@@@CD@B@@@@@@@@@@AB@@@@@@@@@@@@A@@@@@@@@@CB@B@BABADA@@BBB@BB@BBBBBB@@BBD@DBBB@@@@@@@@@@@@@@@@AB@B@@@B@@@@@B@@@@@@@@@@B@B@BBB@DDB@B@D@BAFA@A@@BBBBB@B@DADCBABCBA@@@@BAB@BA@@B@@@@@BABA@A@@B@B@@BF@B@@@@@@@@@B@@@@@@@@@@@@@@B@@B@B@@@@@@@@@BB@@D@@@BA@@B@@@@@@@D@@@@A@@B@@@@@@@B@@@@A@@@@@ABB@@@@B@@@FBBA@@BA@@@ADBBB@@BB@@@AB@@@D@B@B@@BBB@@BBB@B@B@B@BB@B@B@@@@@@@@@B@@@@@@@@@@@B@@@@B@@@FFBBB@B@BB@@B@@@@@F@B@B@@@BB@BBB@B@@B@@BB@B@ABB@@@D@@@B@AB@B@@BB@@@@F@DBD@BBBD@BBB@@H@B@@@BADBDA@@@@@@@@DBF@@BBAHCFG@@@A@@@@BA@@@AAAA@@A@A@A@@BAB@DAB@@@DBB@BABCB@B@B@BBB@@AB@@AAC@@DCBA@ABA@A@@BAB@@A@@@E@@@A@A@C@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@A@@B@@@@@@A@@@@@@@@@@@@A@@@@A@@@@A@@@@@@@@A@@A@@@@@@@@A@@@@@@C@@@@AA@@@@@A@@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@CA@@@@A@@@@@@@@@@@@@@@AA@@@@@@@@@@AA@@@@@@@@A@@@@@@AA@@@@A@@@@@@@@@@@@@A@@@@@AB@@@@@@@@@@A@@@@@@B@@A@@@@@@@@@@@@@A@@@@B@@@@A@@@@@@@A@@B@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@@@@A@@A@@@@@@@@@@@A@@@@A@@@@@@@@AA@@@@@@@@@@@@A@@@@A@@@@@@@@@@@@@@@@@@@@A@@@@@@AA@@@@@@A@@@@@@@@@@@AA@@@@@@A@@@A@@@A@@@A@@@@@AA@@@@AA@@@@A@@@@@@B@@A@@@@@@@@@A@@@@@@@@@@@A@C@@@A@A@@@A@@@@A@@@@@@@@A@ABAB@@@@AD@@@B@B@@A@@@@@A@@@A@A@A@C@@@A@@B@@@@A@@@A@@@@@A@@AA@@AA@@@A@@@@BA@@B@BA@@@@@A@ACA@@AACCC@@@@@@@@A@A@A@@@A@@@@A@@@@@A@A@@@A@@@@A@@@@@@@@@A@@@@@@A@@@A@@@@@@@A@A@@@@@@B@@@@@@@@@@@@B@@@@@@B@@@@@@A@@@A@@A@@@@@AAAA@@AA@@@@@@BA@@@@@@@@A@AAA@@@A@@@@@@@@@@@AB@@@@@@@@@@A@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@B@@@@A@@@@@A@@@A@@@A@@@@@AAA@@AA@@@A@@@A@@BA@@@A@@AA@@AA@@A@@A@@@@@@@A@@BAA',
                ],
                encodeOffsets: [[116870, 23078]],
              },
            },
            {
              type: 'Feature',
              id: '440304',
              properties: {
                name: '福田区',
                cp: [114.055072, 22.521521],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@D@DA@@B@BCBA@A@ADA@@@@@@@@B@@@@@@@@@@@@@BA@@@@@@@@@@@ADC@@@@@@@@@@@@@@@@BC@A@@@@@AB@@@@@@@@@@@@@@@BA@@@@@@@@@@@A@@@@@@@@@@BA@@@@@@@@@@@@B@@@@@@@@@B@@B@@@@@@@@@@B@@@@@@@B@@@@@@@@@B@@@@@@@@@B@@@@@@@@@B@@@@@@@B@@@@@@@B@@@B@@@@@@@@@@A@@@@@@B@@@@AB@@@@@@@@A@@B@@@@@@A@@@@@@@AB@@@@@@@@@@@@A@@@@@@@@@@@@B@@@BBB@B@B@B@B@@B@@D@B@@B@@B@BB@@@@@@@@B@@@@@@A@@@A@@@@@A@@@@@A@@@@@@@@@A@@@A@@@@@@@@@AA@B@@@@A@@@@@@@@@A@@@@@@@A@@@@@@@@@A@@@@@A@@@@@@@@@@@@A@@@@A@A@A@A@EB@@@A@BE@C@A@C@A@@@A@A@A@C@@@@@A@@@C@AA@AAA@AB@@A@AB@BA@@@ABA@@@@@AAA@@@AA@@AA@AA@@A@@A@AAA@A@@@C@AA@@AA@A@@BABAB@DABAB@@A@A@A@@AA@@AAAAAACCA@AAA@A@@BABAB@@A@A@@@A@@@@@@@@@A@@@A@AAA@@@A@@@A@A@AA@@AACA@AA@@AAA@C@AAC@A@@AA@@AAC@AAA@A@A@@@EBABA@A@A@ABC@@@@@@@C@IBA@IBA@A@ABCFCBABU@E@g@@T@BHBAJ@B@@@@@B@@@B@@@@@@@@@@@@BB@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@B@@@@B@AB@@@@@@@@@@@@@@@@@@B@@@@@B@@@@@@@@@@@@B@@@@@B@@@@@@@B@@@B@@A@@B@@@B@@@@@@@@@B@@@B@@@@@B@B@@@@@B@@@@@@@B@@@@B@@@@B@@A@@@@@@B@@@@@@@@@BBB@@@@@@@@B@@@@B@@B@@@@@@@@@@@@@@@@B@@@@@@@@A@@@@@@@@@@B@@@@@@@@@B@@@@@@@B@@@@@B@@@@A@@@@B@@@@@@@@@@B@B@B@@BB@@@@@@@@@B@@@@@@@B@@@B@@@@@B@@@@@@B@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@A@@@@B@@@@@@@@@@@@@@AB@@@@@@@B@@@@@@@@@@@B@@@@@@@D@@@B@@B@@@@@@B@@@@B@@B@@@@@@@B@@@@@@@@@@@B@@@@@B@@@@@B@@@@@@@@@@@F@B@@B@@@@@@B@@B@@@@@@BB@@@BBB@DBB@D@@@@@B@@@@@@@@@B@@@@@@@@@@@@A@@D@@@@B@@@@B@@@@@@@@@DB@@@@B@@@@@@BB@@@D@D@B@BAB@BBFBD@D@@BB@B@B@B@B@@BD@@@BABAJABB@@BD@@@BDB@@@@B@B@@BB@@@FA',
                ],
                encodeOffsets: [[116800, 23129]],
              },
            },
            {
              type: 'Feature',
              id: '440305',
              properties: {
                name: '南山区',
                cp: [113.930413, 22.533287],
                childNum: 4,
              },
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  ['@@@B@BFFB@B@PM@A@@EGA@A@ON'],
                  ['@@AB@BA@@B@D@BDBB@@@HGB@FAHE@I@ACAABC@CBADEFCB'],
                  [
                    '@@KDGBEBEFCB@B@DABA@ABA@GDCBGBCB@B@B@DDBB@D@D@BABAB@BBBD@DBB@BD@B@B@BC@ABCD@D@BDB@B@BAB@BABA@ABADE@CFEDEBG@ECAEA',
                  ],
                  [
                    '@@[S]OEEEAAAC@G@EDGDWZELAHENEh@NBFFNHB@@LFFDHDAF@F@DF@H@@F@BBBF@@@EFBDB@BB@BBB@@B@@BB@DAB@BBHHFD@@@@@@@@@@@@@@BBFDBB@BB@@@BB@@BBBBFD@@@@B@@B@B@@@@@@@BA@@BB@A@@H@BB@BBBB@@BBDD@@@@B@@@@B@@@@@@B@B@DD@@BB@@@B@@@BBBBB@B@B@@@@@@@@@@@@@@@B@@AB@@CBABA@BB@BA@B@A@@@@B@B@D@@D@D@@@@B@B@@A@AB@@@B@BCFAB@BBD@@@BB@D@@BB@@B@D@@@@B@BB@B@B@@@@@@@@AD@BCD@@@@@BDFB@@BBB@D@B@BA@@BAB@B@@@@BB@@@B@@@BAB@@@@@DBB@@B@@@@@@@BB@@@@@@@@@@@BDB@@BBB@@@BB@DBD@B@@ABB@@@DBB@@DBBBBBBB@D@BBD@@@B@@AB@B@B@@ABAB@@@@BBBBBD@BB@A@@BA@@D@B@B@@BB@@AB@BC@A@C@CAAAA@@@ABAD@@BB@@ABCBAB@BAB@@@BBD@@@D@@@B@B@@@B@BAB@B@B@DABABABA@AB@@@@A@A@ABA@A@@@@@A@@BB@@D@B@BA@@B@B@B@@@@@BC@A@@@@BAB@@ABA@AB@@@FE@E@A@AHI@@B@DC@@@@@A@@@@@@B@@@@@@@DAD@B@BCBC@AACBC@@BAB@@@@C@@B@@@@@@@@AA@@@@@ACAI@AA@@A@@@@A@@@@@CA@@@@@@@@A@@@@@@A@@C@@@@B@@@@@@@@@@A@@@@@@@@@A@@@@@C@A@CAA@AA@@A@@A@@@@A@@@@A@@@@A@@@@A@E@@@@@@@@@@@A@@@@@A@@@@@A@@@@@@@@@@@A@@@@@@@AA@@@@@@A@@@@A@@@@A@@@C@@@@@@@A@@@@@@@@@@@A@@@@@@BA@@@@@@@@@@@@@@@A@@B@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@A@@@@A@@@@@A@@@A@@@@@@@A@@@@@@@@@A@@AA@A@A@@@@@@@@@@@@A@@B@@@@@@A@@@@@A@@@@@@@A@@@@@@@@@A@@@@@@@@B@@@@@@@@@@A@@@@@@@@@@@@@@A@@@@A@@A@@@@@@@@@AA@A@@@@@@@@@A@@@@B@@@@A@@A@@@@@@A@@@@@@@A@@@@@A@A@@@@@A@@@A@@@@@@@@@A@@@AB@@@@A@@@A@@@@@@@A@@@@@A@@@@@@@@@@A@@@@@A@@@@@@@@@@@@@@@@@@@BAA@@@@@@A@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@AA@@@@@@@@@@@@@A@@@A@@@@@ABIGA@A@S]@I@G@AAEAAAECCIESCGAC@@EICEMIUM',
                  ],
                ],
                encodeOffsets: [
                  [[116572, 23039]],
                  [[116577, 23051]],
                  [[116552, 22934]],
                  [[116664, 23005]],
                ],
              },
            },
            {
              type: 'Feature',
              id: '440306',
              properties: {
                name: '宝安区',
                cp: [113.883802, 22.554996],
                childNum: 2,
              },
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  ['@@A@@B@@@@@@@@B@@@B@@@@@@@@@@@@@@@@@AA'],
                  [
                    '@@AA@@A@@AAAECAA@@@@@@@@@@@@@@ECGGAAA@CBA@@AA@@@AA@AAAA@ACFE@@E@AA@A@EG@E@@C@EBEGCECKE@@GA@HEVAFETADABC@C@OEGCEBCB@D@F@FBHBD@DDH@FCFGJ{piSdGXCJCLIZCJI`ANATP^FNNJNHDDFBB@BBHBDBDDDD@BBB@BBD@@@DAD@B@BA@AD@BBBBDDBBBDBB@B@@BB@BB@B@B@@ABAB@B@B@@@BBB@@B@B@@@B@BABA@@BAB@B@B@BB@@@@BBDB@@@BB@ABAD@B@BDB@@BB@@F@B@@@B@@@@@B@@@@@B@@@B@B@@@@@@@@@@B@@@@@BB@@@@B@@@@BAB@@@@@@@@BB@@B@@@@A@@@@@@@@B@B@@@@@@@@@@D@@@@@B@@@@@@@@A@@@@@@B@@B@@B@@B@@@@@@B@@@@@@@B@@@@@@@BB@@B@@@BB@@@@@@@@@BBB@@@B@@@BB@@@A@BB@BB@@B@@@B@@@@@@@B@@@B@@@@A@@@@@@B@@@@@@AB@@@B@@@@@@@@@@@B@@@@B@@@@B@@@@@@@@A@@B@@@@@@@@@@BB@@@@A@@@@B@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@CD@@@@A@A@@@@@@@@@@B@@@@B@@@@@@@@BB@@@@@@@@@@@@B@B@@@@@@@B@@@@@@B@@B@@BB@@@@@@@B@@@@@@BB@@@@@@@@DB@@@B@B@BBA@@FBBB@@DBB@D@@BB@BABA@@D@BC@AB@DB@@BB@@BA@@@@@B@@@@B@BB@B@@@@@BB@BAB@@@BBB@D@B@@@@@@@@@@@@@B@@@@@@F@@@@@@B@@@@@CFAD@@B@D@@@@A@@@@B@@BBDAB@BB@@@DD@BB@@@@B@@@B@@@@A@@@BB@@@@D@A@AA@A@AB@B@@@@B@B@@@@BA@@@@@@AABABAB@@@@B@@AB@@B@@@@@@AB@@@@@@B@B@@@@BA@@@BBB@@AB@@@@@@DABB@@BB@@ABABAB@@@@@@@@B@@@B@@B@@@@@@BA@@BB@@B@@B@B@@@A@C@@A@@@AA@@@AB@B@B@@@@@BA@@@@@AB@@@@B@@BA@AB@BBB@@@B@@B@BB@@@B@@@@@AAAA@AA@CEAA@@@B@@@B@@CB@BA@A@@A@AB@@ABB@@@A@A@@@@B@@@@@B@@@AAA@@@@A@ABA@@B@@@B@@@@B@@@@@@@A@@@AB@@@B@B@@@@@@@A@@A@@A@@@BCBBBBB@@D@@@A@A@@D@B@BBB@A@@AA@@AAA@@B@@@D@@@A@@A@@@A@@BABBBA@@@A@@B@@BD@BBB@@@@@BA@@B@@@@@@D@@@B@A@@@@@C@@@@@AA@@B@@A@@@@ABA@@BB@@BB@@B@@@B@@B@B@@BB@@B@@@@AB@@@@BB@BB@@B@B@@@@@B@B@@@B@B@BAB@@@D@B@DA@A@@CBA@@@C@@@@@ABA@A@@@A@A@@ACBA@@@CA@@A@@@@A@@@@B@@@@AA@CB@A@A@@BA@@DADA@@BA@@A@AB@@CA@@@@@BB@CBABAB@@@@AAA@A@A@AB@@@@C@A@A@A@@@@@A@@@CB@B@BAAA@@@@@@@@A@@@ABA@ABGB@D@B@B@B@@ABA@ADBB@B@@A@@BA@BB@@BD@DBD@@AD@B@BBB@B@B@D@FBB@D@B@@@@A@@A@@@BAB@@@BA@@BAB@B@B@@A@@F@B@@A@CDABA@@DADA@@B@@AAA@@@@@@@A@@@@BA@@@@@@@@@@AA@@@@@@@@@A@@@@@@DA@@B@@BB@@@@A@@BA@@B@B@DDBB@@BA@@AABABAB@B@@@BB@@B@BAB@@@@@@@B@@AB@@@DA@@B@@A@A@ABACA@@A@A@A@@AAC@@BCBABA@A@@B@@B@@@BAD@@@@B@@@@A@@B@@@@@BB@AA@@A@@@@B@BB@@ABB@@@@ABBD@@BBBB@@@@BBA@@@AAC@@ABA@A@@A@@@A@@@@DBD@L@@@@A@C@C@ABC@A@@@ABA@A@@@ABE@@@CB@BC@CB@@A@AB@B@@C@@@AAAAAA@@A@@@ABA@A@@B@B@BAB@@@BA@A@AB@@A@@@@AAA@@@AA@@@@A@@@@A@@AAAA@@@@A@@@A@@@AB@AA@@A@@@@@AB@@A@@A@@A@@@AB@@@B@@@B@@@B@@@@@@@BB@@BA@@B@@@@@@@BA@@@@@AB@@@@@@@B@@@DA@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@AB@@@@@@@@@@@@@@@@@@@@@BA@@AACA@@B@@@@AB@BA@@@@@@@@@@@AB@@@@@@@@@B@@@@@@AA@B@@@@@@@BA@@A@@@@@@@@@@A@@B@@@@@@@@@@A@@@@@CAA@C@A@@A@A@@B@@@@A@@@@@@@A@@@@@A@@@@@@@@AA@@A@@@@@@@@@@@@A@@@@A@@@@A@@@@AA@@@@@@@@@AA@@@@@@A@@A@@@@@@@@AA@@@@@@A@@@@@@@@@@A@@A@@@@@@@@@@@@@@AA@@@AA@@@@@@@@@@@@AA@@@@@@@@@@@@@@@@@@A@@A@@@@@@@@@@@A@@A@@@@@@@A@@@@@AA@@@@@@@@@AAA@@@@@@@@@A@@@@AA@@@@@@@@@@@@@A@@A@@@@@@@@@@@@@AA@@@@@@@@@@A@@A@@@@A@@@@B@@@@@@@@AA@@@@@@@@@@@A@@A@@@@@@@@@@A@@@@A@@@@@@@@A@@@@@@@@A@@@@@@@@@@@A@@@@A@@B@@A@@@A@@@AA@@@@AAAB@@@AAAE@@A@@CDB@A@@BA@@C@@A@@B@B@@@B@@@@@BA@@B@@@@A@ACA@DCC@AF@AAA@A@A@AAB@@AB@CABCAA@CB@BAAAAA@A@CA@A@A@AA@@@ABAA@AAAAAA@ABA@C@@DA@ABCDC@@@A@@@A@@@@@A@A@@AA@@@@@A@A@ACA@@@A@A@AA@C@@@@A@@@AA@@BA@@AA@A@C@@@AB@@@BAAC@AAAA@A@@A@AB@BA@A@A@@BA@@@C@AAC@A@AAAAAA@CA@CA@@A@BA@@@AAC@CAA@@A@AA@@CA@A@@@@@@@@@@AA@@@@@@A@@@AA@C@@@@BA@A@@@A@@AA@@@@@ABA@AB@@A@A@CAA@AA@CE@A@@@@DC@ABC@@@@@@@@@A@AAAA@@@@@@C@AA@@AC@A@@A@@AC@ABADE@A@A@@BAB@@@@A@A@@C@C@@@@C@A@A@@B@A@B@@AAAB@BADA@@BA@@@A@@@@@@@@@@@@@@@A@AAAAA@A@@@A@@AA@@CCA@A@@@@@@@@A@@A@@@@@CCAA@@AAAAA@@A@GB@A@@AB@@A@@@@@@@A@AA@@@@@ECAAAA@@',
                  ],
                ],
                encodeOffsets: [[[116556, 23085]], [[116645, 23095]]],
              },
            },
            {
              type: 'Feature',
              id: '440307',
              properties: {
                name: '龙岗区',
                cp: [114.246899, 22.720974],
                childNum: 2,
              },
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    '@@A@CAAACAAAAA@@A@AC@AAC@A@AAA@@@CBC@A@AA@@AB@BABADABABABA@@@C@AAECCECEBC@A@AB@@C@A@A@@@CA@@AAAAA@@AAAE@EEAA@@@@@@@@@AA@@@AC@@AABA@@BC@AACC@@AACA@@A@C@@@@@A@@@@A@@CA@@A@A@ACA@@CG@@@AA@CAA@@ACA@@@@@D@B@B@@@F@@@BA@AB@@@BAB@BABCD@@BD@BA@@BA@AAA@A@A@ADABA@CA@@A@CBA@AB@@@B@B@BB@BB@B@@AB@@@@@B@@EHGDAB@AE@CA@@@@@@@@CBCAAB@@A@G@@@AA@AACAAC@CAE@@@@@AA@@@ABAA@@@C@@@A@BAA@A@@AA@@@@AAA@AAA@@A@A@E@@@@@A@@@AAA@A@AAEE@@A@@@@@@A@@@@@@@@@@@A@@@@@@@@@A@AAAA@A@A@A@AA@@AA@AA@A@C@@@A@@B@@AA@@AACA@B@@AB@@ABEA@@A@@@@@AA@B@@@@@B@@A@@@@@@@A@@@@B@@C@@@@@@@A@@@AB@@C@@@AA@@@@@@@@A@A@@@@A@@@@@@@@@@@@A@@@@@@@@@A@E@@AA@A@@@@BABAB@@@@A@@@ABA@AB@@@@ABADABCDCBA@A@AAAA@@@BEBABC@A@A@CCA@AAA@A@@@@@@@@@@@@A@@@@@A@@@ABA@@@@@@@@@@@@@@@@AACAC@@BCDABABA@AA@@CD@@@@@B@@@@A@A@@@CFA@AB@BBB@B@@@@@@@@BB@@@@@@@@AB@B@BAB@B@B@B@@@B@B@B@@@BC@@B@@@B@D@@@@A@@@@BA@@@AB@@@@@B@@@@@@B@@@@BA@@@A@@B@@@@A@@@@@@@@@@@@@@@@B@DB@@@B@@@@B@@@DA@@@@@@D@@@@@@@@@@@@@@@BBA@@@@B@@@B@@@@@BB@@@@@@BB@@CD@B@@AB@@@@@B@@@@BB@D@H@B@@@@@JAD@@@@@F@@@@@@@@@@@B@B@F@B@@@@@B@@@BFCBB@@@@@@@@@@@@@@@@@@BA@@@@@@@@@@FF@@@@@@DD@@FDBB@BBB@@@@@@@@@@@@@@@@@B@@@@@@BADAB@B@B@@BB@@BB@DABCBA@@@@@@@@@@@@@A@@BA@ABEBAB@@AB@@A@A@A@@DADA@@DFB@@DB@@B@@@@@@@@@@BBB@FD@@DBB@AH@B@D@@@BEH@BADA@@B@BBDD@B@@@DB@@@@@@@@@@@B@@B@@@@@@B@@AA@@@@A@AB@@@@A@AB@@@B@@A@@BA@@@@B@@@@A@@@@@@B@@@B@B@@A@B@AB@@@B@@@@@@@@@@@B@@@BBDBA@@@@BBBB@BBBBAB@@BB@@@@@B@@B@AD@@DBBDB@B@BDF@B@BBB@@BBDD@BB@@@@@BBBBD@@@DE@ADA@@@A@A@@BAB@@@B@BB@@@@@@DBDA@@B@@ABA@A@@F@@@B@B@BB@B@B@@B@B@@@@AB@@@BAB@BA@@@@B@@@@BB@AA@@@A@@@A@@@A@@@@AAB@BA@AB@@A@@@A@@AA@C@@@A@@DABA@@D@@@BCBC@ABC@A@@ACDAJEBAB@@@B@@@DCAAB@@AB@@@B@B@B@@AB@@@BA@@AACB@A@A@@BC@A@A@@@@@A@@AC@@CE@AAA@@@@@@AD@@ABA@E@@@@@@@@@C@@@@@@@CI@@B@@@@A@@AA@@@AB@BB@DBB@@@A@CB@@@BBBB@DB@@ABABEAAAA@A@@@@@@@@@A@@@@@@@@B@B@@@@@@@@@D@@B@B@@@D@B@@@@B@@@DB@@B@@@@CDA@A@@@AAA@@BADABA@@@@B@@@@@F@B@DB@@B@@BA@ABBBBD@BBD@@BB@BD@@@B@BBBB@@ABA@@B@@@B@BABDB@B@@DDB@@@B@@B@@@BJF@BBB@@@B@@ABA@C@CHBB@@D@@AB@D@@DDH@B@B@@A@@@@BA@BDBB@@@BB@@BAF@B@B@@@@CB@@@B@B@BDDBBB@B@@@BDB@@@B@B@BA@@@@B@B@@@BDBB@@@@@B@@AB@@A@@B@@@B@B@@@B@@@@@@@B@D@D@B@@@@BD@@BB@@@@B@@@@BBB@@B@BBBB@D@@@B@BCDABAB@@A@ABA@@@@BBB@B@BBB@B@@ABEBA@@AAA@BCHB@@@@@DBB@@B@@@BA@ABA@@@@AA@@@ABABA@@@BF@D@BC@@@A@@A@@A@@@@@A@@BA@AAAAE@A@@A@@A@ABA@@@ABCAAB@@@D@B@@@@@@B@@BD@@A@@B@B@@B@@B@@B@@AB@@ABA@@@CB@@@B@B@BA@AB@A@@@@@A@ABA@A@@@@A@@@A@AB@@@BBB@DAB@BB@B@DB@@@BDBBDB@DB@BB@D@B@F@B@@@BD@@JB@@B@B@BBD@FF@BBFBDBB@@CBDD@BBDBB@DB@DBB@BABB@@DBBB@@@DDB@@DAB@@E@ADCB@@ABA@IBA@A@A@A@C@@@AB@JABAD@B@B@BABEHG@A@A@@DA@BB@BB@@@@D@D@DAB@FFB@FF@@@@BB@DAB@@@BB@B@DBB@@@DB@@BB@@@B@@@B@@@@@@@@@@@@DBB@BB@@FF@B@B@B@@BB@BBB@@DAD@BBB@BB@ABAB@B@@A@@@A@CB@FA@@NAB@@BDB@@D@B@D@@A@A@@@AD@BBB@@B@BBBBD@@@B@@DA@@@@FAH@B@BB@BBD@@D@@@@@@@B@@@@@@@D@D@DBB@@@B@B@BA@@DABBB@B@@@@ABA@@BA@@B@BBBA@@@@@A@A@@@@AAA@AG@@@@BCB@@A@A@EAEA@CAA@A@AA@@@@@@ACCA@A@@@@BABA@@@CBABAD@@@BBB@@@HA@@BADE@@AA@@@A@@BEAC@A@@AACB@@@BAB@@AB@@CA@A@@AC@@@@@A@@@A@@@@@A@@AA@@A@AAB@@AA@AA@@@A@AB@AAA@@@AA@@ABAA@A@@@AAA@@@A@A@@A@AC@@@AB@D@@E@A@AAA@AAGBADA@A@A@EAC@AL@FQAEAAC@A@CAA@AAA@@@A@C@E@EAC@@@@C@A@A@@@A@@@AA@@@ABAA@@A@@@A@@@@A@@@A@@@@@@@@@@A@CB@@@A@@BABAB@@CAA@@@A@A@A@A@@@A@A@A@A@A@ACDCBAAACAAEAE@C@C@C@C@@CAA@@CA@AC@A@A@A@A@@@@@AAAAAA@AA@A@A@CBA@@AA@@AAAA@@@G@A@AAA@@AC@@@@AAC@A@@@AA@@A@AA@@@AA@@AA@@AC@A@@BAAA@CBCDC',
                  ],
                  [
                    '@@G@@@ABA@@@@BBD@BBB@@FL@B@B@B@@@BB@@@@@@BABAB@@AB@BAB@@@@@@@@@B@@@@BB@@@@@@B@@BB@@@B@@@@@@@@B@B@@B@@@B@@@@@@B@@AB@B@@@@@@B@@@B@DABBD@@@@@@CB@@@@A@ABAB@@BB@@@@A@@BA@@@A@@@@BBBA@@@@@AB@B@@@@@BABB@@@AB@@BBAB@@@@@B@BB@B@@@B@B@@@B@@@D@@@@B@@B@B@@@B@@F@B@@BB@DA@@B@@B@B@@AB@@A@@@@BBB@@BB@@@@A@ABA@@@AB@@@B@@@@B@@BB@@@@@@BB@@@@@@@BBBB@A@@BABA@AB@@A@@B@BA@@@A@@@@B@@@@@B@@@@AB@B@@@@@BB@AB@@@DA@@@@B@@B@@@@@@@BAB@@@BBB@B@@@@B@@@B@BBB@@@@@BBB@@@BB@@@@B@@BB@B@@B@@B@@@B@@@B@@@@@@@B@@B@@@@@@@@BB@@@@B@@@@@B@@@@@B@@A@BB@@@@@@@DBED@@@BB@B@BC@@BBB@@@@@ABBB@@B@@BBA@@B@B@@@B@B@@A@@@@BDB@@@B@@@@@@BA@B@@@@@BBB@@@B@@@@@B@@BDB@B@@BBB@@B@@DB@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@B@@A@@@@@@@@@@@@@@@@@@@@@B@@B@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@B@@@@B@@@@@@@D@@@@@BB@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@HBBBB@B@BB@BBB@B@@B@BBFAD@BABAD@F@B@F@BAB@BA@@@AB@BA@@@@@@@@@@@@@@@@BAB@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@DB@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@BB@@@@BH@@D@D@DB@@B@D@B@DB@AB@BAFBDAH@@@@@@@@@@@B@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@DEAAAA@@@A@ABAB@B@^B`AP@ZDVFHBNALALCHCDG@I@GCGEGGQEIGIEGECKGIGOQGKCI@MBGDIFGFEJEDCHEJCLCLAH@LAJ@DAFADEBGDGBGHKFIBM@IAICIKSEEIG]IWGSCQEG@G@GAGACAEECCAIGKGIGCKCOCU@MBKDIDIFILENEJIlAL@FBPBJBLBJ@HCJENEHKPGFKJGHIFEFADADCHALANGJIHKJKDKDGBEBQ@MCGAGAGEMEGCMAEN@B@@@@@@@@@B@@@B@@@@@@@@@B@@@D@@A@A@@@@@@@@@A@@@C@@@@A@@A@@@@@A@',
                  ],
                ],
                encodeOffsets: [[[117013, 23198]], [[117088, 23145]]],
              },
            },
            {
              type: 'Feature',
              id: '440308',
              properties: {
                name: '盐田区',
                cp: [114.236739, 22.557001],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@C@@B@@@D@@@D@BA@@B@@A@@@@B@@A@@@@@@@A@@@AB@@@B@@@@A@@B@@A@@BAB@@@@A@@@@AA@@@@@A@@@CA@@@BA@@@@@AB@@AB@@@@A@A@AA@@@@CBA@CA@@@@A@@@@B@@@@A@@B@@@AC@@@@@A@@@BB@@@@@@@B@@@@@@@@@@@@@@@@@@B@@@@@@B@@@@@@@@@@B@@B@@@@@@B@@@@@@B@@@@@@@@@@@BB@@@@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@A@@@@B@@@@@@@B@@A@@@@@@B@@@@@@@@@@@@@BA@@@@@@@@B@@@@@@@@A@@B@@@@@B@@@@@@@@@@@@@B@@B@@B@@@@B@@@@@@@@@BB@@@@@@@@@@BB@@@@@@@@@@@@@@B@@@@@DB@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@B@@@@@B@@B@@D@@@@@@@@B@@@@@@B@@@@B@@@@@@B@@@@@@B@@B@@@@@@@@@@@@@@B@@@@A@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@DB@BB@DBB@@B@@DH@@DB@B@B@BB@@DB@@@@@@B@@@@@D@BB@BD@BD@BD@BAD@@ABBB@@BD@@B@@B@@@@@@@@BBFFF@BB@BB@BBBB@@DB@@B@B@D@@@BAB@D@FAFDDDBF@B@D@@ABABABCBABABA@@BB@@B@BAD@D@@BB@B@BBD@BBDB@@@BBBBDBBBDBB@BADA@@BABA@A@ABABABABAB@@@@AB@@A@@@@@@@@@@@@@@@@@AB@@@@@B@B@B@@@@@@@BAP@D@DKLEDADA@@B@DABC@@@ABAD@D@B@D@@@@B@BB@BAB@@ABABAB@B@F@BBBBBDHA@@FABA@@BA@ABA@@BABA@A@@@@A@@A@@@A@A@AEK@@AA@AAC@A@@B@BA@@H@B@@@@@B@@@@B@@D@@@B@@@@@@@@@B@B@@@@C@@@A@@@@@@@@@A@@@A@@@@@@@@@AFMKCG@K@MBIAGACCCCAAAAGECECECCACCAE@CACCCACAE@E@C@G@KA[CCA@@QKMKCA@@GGCAEA',
                ],
                encodeOffsets: [[116975, 23082]],
              },
            },
            {
              type: 'Feature',
              id: '440310',
              properties: {
                name: '坪山区',
                cp: [114.350584, 22.708881],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@ABEB@@GBACAAAAE@A@A@ABAB@BA@ABA@@A@A@@C@A@C@C@AB@B@@ADCBA@@@CBCBKFCLC@O@AB@@@@@@A@A@A@@@@@A@@B@@@@@@@@@@@@@@@@@BA@@B@@A@ABABABAB@B@BABAB@@CBABCDAD@DBBAB@@@BBD@@BB@@BB@@B@@B@BB@@B@@@BBD@B@@D@@BB@BBB@H@@@B@BB@BB@@BB@DAB@B@B@@BBBBBBB@@@@B@B@B@B@D@@BDB@@BB@DD@D@D@D@F@FBBBBDBBDADC@B@B@B@B@B@B@@@B@B@B@B@@BB@DA@ABAB@@@B@@DAB@@@@@@@@@@@@B@@@B@@B@@@B@@@BBBA@@B@@B@@@B@@@B@B@D@@D@FBF@D@B@@@B@BBB@DBB@D@BBBFERK@@BBD@F@B@BCBABBH@BBB@B@B@FC@A@@B@@BDB@@@@B@B@@BB@B@@@BBBBA@@BB@@B@BBA@@B@B@@BBB@@BA@BBB@@@BB@@@B@@@@@B@@@B@@@@BD@@@BDB@@BA@@BA@A@@DABB@AB@DA@@@ABBB@B@@@@@@@BBDBB@B@@@B@@@BAB@@AB@B@@@BAB@B@B@@@@@BA@@B@DA@@@@@@B@@A@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@A@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@@@@@B@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@A@@@@B@@@B@@@@@@@@@HD@@B@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@B@@@@@@@@@DBB@D@B@B@BAB@@@B@@@@@B@B@@@@@@BD@@@FBBB@BBDBDBDB@@BA@@@@@@@@@@@@@A@@@@@@B@@AB@BA@@@@@@B@@@@@@@@@B@@@BA@@@A@@BA@AB@@@@@BA@A@A@A@@@A@@@@@@B@@@@@@@@@@@@@@@@AB@@@@@@@@@@@@@@@@@@@@@B@@A@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@A@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@B@@@@@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@BA@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@BA@@B@@@@@@@@@@@@A@@@@@@A@@@@@@@@@@@@@@A@@@@@@@@@@A@@@@@@@@@@@@@@A@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@A@@@@@@@@@@@AA@@@A@@@@@@A@@@@@@@@@@A@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@@@@@@@AA@@B@@@@@@@@@@@@@@@@@@C@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@BA@A@@@A@EAAAA@@@A@A@A@AA@@AAAAACAAA@G@C@AA@@@A@@B@@A@@@A@@A@A@ABADC@ABC@@BCB@@A@AA@@@@A@@B@BA@@BBBBB@@@D@B@@@@AB@BBB@BDBA@@@@@@@@@A@ADABABAAA@@@@@C@@@A@A@AFGB@@BB@HBB@@@@@@@@@@@@@@@B@BEDAB@B@B@BB@ABA@ADCBGAAEI@AA@A@CAA@@@@@@AAAA@AAAAC@A@CA@@@A@@@A@CBA@A@CDAB@@A@A@A@@@A@@@@@@@@@@@@@@@@A@@@@@@@@@@@@A@@A@@@@@@@@@B@@@CA@@@AA@AA@@@ACA@AA@@@@@A@@@A@AA@@@@A@B@@A@@@@A@@@A@AC@@@@@BA@A@@@A@A@@@AB@AA@@@AABA@@@@A@AA@@ADA@A@@A@@FCCA@@@@@@A@@A@BA@@@@@A@@@@@A@@@@@AA@@@@@@@@@AA@@@@@@@A@@@A@@@A@@@@AA@A@@AA@@@@@AA@@A@AA@@@@A@AAA@@@A@@@@@@AAA@A@@BA@A@@@@@@@AA@@@@@CB@@A@@BAA@@@@A@A@@B@@A@@@@@A@@@@@@B@@ABA@@@@BA@@BABAB@@@BAAAA@@@@@@A@@A@@@@A@@AA@@@@@@A@@BA@@B@BAB@@@@@AA@@AA@A@@B@@@BA@@@A@AA@@@CBA@@AA@E@@@@A@@@A@AA@@@@@@C@@@A@@@A@A@@@AAAA@@@@@A@AB@AA@@B@@AAAB@@@@A@A@@B@@@@ABAA@@@@@B@@AB@@@B@@A@@AA@AB@B@B@@A@@D@@@@C@AACBA@@@A@@@@@@@@ABA@@@A@@@@A@@@A@@@@A@A@@@@@@A@@@A@@AA@@@@@@@AA@@@@@A@@@@@@',
                ],
                encodeOffsets: [[117084, 23167]],
              },
            },
            {
              type: 'Feature',
              id: '440309',
              properties: {
                name: '龙华区',
                cp: [114.045422, 22.696667],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@@B@@@BB@@B@@@@@@@@@B@@@BA@@@@@@@@@@@@@A@@@@@@@@B@@A@@@@@@@@@@B@@@@B@@B@@@@@@@@@@@B@@@@@@@@@B@B@@@@A@@@@@@@@B@@@@@@@@@@A@@@@@@@@F@B@@@@@@@@@BB@@@@@@@@@@@@D@@@@@@@@@B@@@@@@B@@B@@@@@@@@@@@@@@@@@B@@@@@@@@B@@@@@@B@@@@@@@B@@@@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@B@@B@@@@@@@@@@@@@@@@@@BBA@@@@@@@@@@BA@@@@@@@@@@@@@@B@@@@@@@@@@AB@@@@@@@@@@@@@B@@B@@@@@@@@@B@@@@@@@@@@B@BB@@@@D@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@B@@@@@@@@@@A@@@@@@B@@@@@@@@@B@B@@@@@@@@@@@@@@@B@@@@B@@@@@@@@@@B@@@@@@B@@@@@@@@@@@@@B@@B@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@BBD@@@@@@@@@@BB@@@@@@@@B@@@@B@@@@@@B@@@@@@@BA@@@@@@@@BC@@@@A@@@@@@@@@@@@@@@@AA@@@@@@@@@@@@AB@@@@@@@@A@@@@@@@@@@@@@@@@@A@@B@@@@@@@@@@@@@@@DC@@@@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@A@AA@@@@@@@@@@@@A@@A@@@A@@A@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@BA@@@@@@F@BA@@@@@B@@B@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@BA@@@@@@@@@A@@@@@@@@B@@@@@@@@@@@@@@@BA@@@@@@@@@@@B@@@@@@@@@@@@B@@@@@@B@@@@@@@@FB@@@@@@B@@@@@B@@A@@@@@@@@@@@@@@@@@C@A@@@@@@@@@@@A@@@@A@@@@@@@@@@@@@@@@@@@@@@@A@@A@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@DA@A@@B@@@@@@@@@@@@@@@B@@@@@@B@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@DCBCB@@A@@@AA@@@@ADAB@@@@@@@@@@@@@B@@@@@BBBB@@@@@BB@@@@@@@BBB@@@@@@@B@@B@@@@@@@@AD@@@@@@@@@@B@@BB@@@@@@B@@@@B@@@@@@@@@@B@@B@@@@@@@@@@@@@B@@A@@@@@@@@B@@@@@@A@@@@@@@@B@@@@@@@@@B@@@@B@@@@@@B@@@B@@@@@@@DABA@@@@@@A@@@@@@@@@AABADBD@B@BBBA@@@AAC@AB@BABE@@@A@ACA@ADC@@@@BA@AB@BB@@BA@@@@BC@@@@@@@@BKB@FA@@BAD@A@@ACCAA@@AA@A@ACE@A@ACAAA@CC@@B@AA@@@@@A@@AA@ABAA@AAAAA@@@@ABAC@A@@@A@@@@@@@@@@@A@@BAA@B@@@@A@A@@@A@@@@B@@@@@@A@@B@@AB@@@@A@@BAB@@@@@BAB@@@@@BB@@@A@@@@A@@@@A@@@@@@@@@@CA@@A@C@AC@A@AB@BC@AFG@A@@@C@ABGA@CA@@ECA@AA@@@@@@@@@@@AA@@CA@CE@@CBCB@@@B@B@BA@@BA@ABAF@BAB@@@B@@@@@@@@@@@@ABADCBA@@AA@@AA@A@A@CBAB@@@@@@@A@@@@@@@@@@@@@@@@AA@AAAEC@@CC@@@@@@EE@@@@@@@@@@AB@@@@@@@@@@@@@@@@@@AAED@A@@@A@@@@@A@E@A@A@@@@@@@@@@@E@@@@BC@I@@@@@A@G@CAA@@@@@A@@@@BA@@@ADC@@AA@@@@@@AA@@@@A@@@A@@@@@AB@A@@@@@@@@@@@@@@@C@@@@B@@C@@@A@@A@@@A@@C@A@@@@@@@@@@@@@@B@@@@@@AB@@@B@@A@@A@@@@@@@@A@@@@BA@@B@@A@@B@@@@@@C@A@@@AD@@A@@@A@A@A@@@A@A@ABA@A@ABA@@@@@@@@AA@@@@@@@@@AAA@ABAB@DE@@B@B@@@@@@A@@@@DC@@BBB@BABADC@AAA@@AAAAAAA@@AAA@A@@CBC@EB@@A@@AA@A@@@@@CA@A@@AC@@AAIBABAB@@C@@AA@A@A@A@A@@AC@C@EAAAA@ABA@C@C@@@@BBJBD@@@@B@@B@@@@@@A@@@@D@@A@AB@@ADBD@BADADA@C@CB@@@@@@A@@@@@@@@B@@@@CDA@@@GJ@B@B@FEF@@A@@BAB@BA@AB@@@@@BAD@@@@A@A@A@@@ABA@C@@@AA@@@B@@@@@BAB@B@B@B@@A@@BABABABCBA@A@A@ABA@@@A@A@@@C@@@C@AA@@A@ABA@ABAD@BA@@AC@AB@B@@BBBB@D@D@BAD@B@@@B@@D@B@@B@B@B@@DB@B@B@B@@@@BB@@@B@B@@@@@B@@@B@@CDAD@BCB@@@DAB@BBBBBBBB@AB@B@@BBB@B@B@@D@BBBBBABA@@DBBADDBA@@BA@BBB@B@B@BBE@@BDD@CDB@B@B@@A@@@AB@@@@A@@@A@A@@@@BD@@@AB@@@BCA@DB@@@BFBB@@A@BB@B@@B@@B@@@B@@@BA@@@@B@@B@@@@@@@@@@@B@@@@@@@@@@B@@@@@@B@@@@@@B@@@@@@@@B@@@@B@@@@@@@@@@BB@@@@@@@@@A@@B@@@@@@BB@@@@@@@@@@@BB@@@@@@@@@@@@B@@@@B@@@@@@@@@@@@BB@@@@@B@@@@@@@@BB@B@@@@@@@@BB@@@@B@@@@@@@B@@@@B@@@@@@@@@@@BB@@@@@@@@@@@@@@@@@@@BB@@@@@@@@@@@@BB@@B@@B@@@@@@@@@@@@B@@@@B@@@@@@@@B@@@@@@@BB@@@@@@@@@BB@@@@@@@BB@@@@@@@@B@@B@@B@@@@@@B@@B@@@@@@@@@@@@@@BB@@B@@@@@@B@@@@@B@@@@@@@B@@@@@@AB@B@@@@B@DBB@D@@@@@B@@@@@@@@A@@@@B@@@@@@@@B@@@AB@@@@@@A@B@@B@@@@A@@@@@@@@@A@@B@@@@@@@@@@ABA@@B@@A@@@DBBB@@AB@@@@@@@@@@@@@@@@@@@@A@@B@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@CB@@A@@@@@@@A@@B@@@@AB@@@@@@A@@@AB@@AA@@@@@@A@@@A@@@A@@@A@@B@@@BB@@@@BA@@B@@@@@BB@@BBA@@B@@@B@@@@@BBBB@@@B@@B@@@@@BB@@B@BB@@@@',
                ],
                encodeOffsets: [[116739, 23310]],
              },
            },
          ],
          UTF8Encoding: !0,
        })
      : void D('ECharts Map is not loaded')
    : void D('ECharts is not Loaded');
});
