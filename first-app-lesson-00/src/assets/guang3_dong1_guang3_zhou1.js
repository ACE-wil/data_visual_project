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
      ? void A.registerMap('广州', {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: '440103',
              properties: {
                name: '荔湾区',
                cp: [113.244258, 23.125863],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@@AEAB@@A@GAE@C@M@IAOAIBE@G@@@@BE@CBGH@@CDGFGFA@@@GDE@ABCBA@CBCDAFADAD@BBB@BBB@B@@@@CD@B@@B@F@B@B@BBB@B@FD@BFB@BD@BBRAD@@@@@@@B@D@B@@@@@@@@BBB@@A@@@@@@B@@BBDB@@BB@@AB@@@BBB@@@@@@@@@@@@@B@@@BA@@BB@@@@BD@B@@@@B@D@@@B@@AB@A@@C@AAA@EB@@@@AF@FAD@@@@@@@BA@@@@@A@CB@BBBBAB@@B@BABAB@B@@@B@@B@@@@B@@@DAD@@H@D@BDBJ@DBF@B@D@JBBDH@FBB@@@@B@@@BCDGBADAB@@AB@@A@@FC@BBB@BB@@@@@@@@@@@@@@@@@DBBB@BB@BB@BBB@@@@B@@@@B@B@B@@@BBD@@@B@@@@@@@@@@@@@@@D@BHB@BB@@B@C@A@@@@AA@@@@@@B@@ABABC@@@C@@@@@AB@@@@@@AD@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@BB@@@@B@@@@@@@@@@@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@BA@@B@AA@@@@AAA@@ABB@@@@B@@@@@@@@@@A@A@@B@@@@A@@@A@@@@@A@@@@@@@@@@@@A@AAA@A@C@EA@@AA@@A@@@@@@@@@@@FA@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@A@@B@@@@A@@@@@@@@B@@A@@@@B@@@@@@@B@@A@@B@@@@@BA@@B@@@BA@@@@@@@@B@@@@@@E@@@@@@@@@@@@@A@@AC@@@A@@@@@@@A@@@@@A@@AA@@@@@@@A@@@A@@@@BA@@@@A@@A@@@@@@@AB@@A@@@A@@@@@@@@@A@@@@@@@C@@@@@@@@@@@@BA@@@@@@@AC@@@AAA@@@@@@@@@@@@@@@@@AAA@A@CAA@EAB@BCBA@ABADE@@BABE@ABC@ABC@CBA@A@@@@@AB@@@@A@@DE@@@@@AB@@@@@@A@@BC@@BA@@B@@@@ABABA@@@@BA@@@@@@BA@A@@B@@AB@@AB@@@BA@@@@@@DA@@@AB@@@BA@@@@B@@A@@DA@A@@B@BA@@@AB@@A@@@@C@CAC@CACACACACACACA',
                ],
                encodeOffsets: [[115976, 23600]],
              },
            },
            {
              type: 'Feature',
              id: '440104',
              properties: {
                name: '越秀区',
                cp: [113.266835, 23.128537],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@@@@D@BAB@@B@ABAD@BA@@@A@@C@C@@AA@CA@@@@@@@@IAE@@@EAA@C@CBA@IBCBGBAB@@@@A@@@A@ID@@AB@@@@A@@@CB@@A@A@@@A@A@A@@@@@E@@AC@@@@@@@@@@@EA@@@@@@@@EC@@A@AAA@@@@@@@AA@@A@A@@@AA@B@@@@@@AB@@@@@@@@@@@@@D@@@@@@@B@@@@@@@@@B@@@BA@@B@@@@@@@BB@@@@@AB@@@@@B@@@B@@@@@@BB@@@B@@@@@B@@@@@@@B@@BD@@@B@@@@@@@@@@@@@F@@@@A@@@@@@@@@AB@@A@@@AB@@@@A@@@@BA@@@@@@@A@@@@@@BA@@@@@@@@@@B@@A@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@EB@@@@@@@@@@B@@@BB@@FBD@B@B@BBB@@@@@@@@@@@@@@B@@@@@B@@@B@@A@@@@B@B@@@@@@@@A@@@@@AA@BB@BB@@@@BBA@@@AB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@@@@@@@A@@@@@AA@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@C@@B@@@@A@@B@@@@@D@@ADAB@BA@@@@@@@BB@@@@@B@D@B@@@@@@CB@@@B@BB@@@@@@@@@@B@@@@@@@@@@@B@@@@B@A@@B@@@@@@@@@@@@@BA@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@B@@@@@@@@@@@B@@@D@BA@@@@@@B@B@FA@@BAB@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@B@@@@@@@@A@@@@@@@A@@@@B@@@@@@@@@@@BA@@@@@@@@@@@@@@@@@@BA@@@@@@@@@@@@@@@@@@@@@@@@BA@@@@@@@AB@BA@A@@@@@@@@@@@AA@AA@@@@A@@@A@@@AC@@@@@@@@@@@@@@@@DADA@@B@@@D@@@@@@@@@@@@@B@@@@@D@@@@@@@B@@@@@@@@@@@@@@@@@@A@@@A@@B@@@@@@@@@@@@@@@B@@@@@@@B@B@@@@B@@@BBD@@BB@@@@@@@@@@B@BBD@@@@@D@D@BB@BB@B@BB@@@@@@@@@@@@BABAB@B@@@@@B@B@B@@@B@B@@@@@@@B@@@@@@@DD@@@B@@@@BB@@@@@@@B@@@@@@@B@@B@B@@@@@@@BC@@@@@@@@@@@@@@@@@@@@@@BAB@DB@@B@@@BBB@@@@@@@@@@@@@@AB@@@@@@@@@BC@@B@@@@@@@@@@@@A@@@@@@@@@@@@A@@@@@A@@@@@@@AA@@@@A@@@@@@@@@@@@@AAA@@@@@@@@@@A@@@@A@@@AC@@@@@A@@@@@@@@@AB@B@@@@@@@@@@@BA@@@@@@BA@@@@@A@@@@@@@@@@@@@@@@BA@@@@@@@@@@@@BCBE@@@@@@@@@@@@B@@@@@@@B@BD@@BB@@@@@@@@@BB@BA@@@AB@@@@@@A@@@@@@@@@A@@@@@@@@@@@A@@@@@@@A@@@C@C@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@C@@@A@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@E@@@@@@@A@@@@@@@@@@@A@@@C@@@@@A@@@A@@@A@@@@@@@@@@@@@@@@@E@@@@@@@@@@@@@A@A@@@A@@@@@A@@@@',
                ],
                encodeOffsets: [[116035, 23668]],
              },
            },
            {
              type: 'Feature',
              id: '440105',
              properties: {
                name: '海珠区',
                cp: [113.317443, 23.083788],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@A@CBGDGBEBGBA@@@A@C@A@E@A@A@EAE@G@ABE@E@EBA@E@AFCCC@ABA@C@ABC@A@C@C@AA@@@BA@@B@@ABA@@@@BCB@@@BA@@@@@AB@@A@@B@@CB@@@@@@AB@@A@@BA@@BA@@@@BAB@@@@@@AB@@@@ABAB@B@@A@@@AB@@AD@@@B@@@@A@@B@@@@CF@@@B@@A@@B@@@@@BAB@DAD@BAD@BAFAB@@CFAB@BABADA@FBB@DBB@B@BB@@@@@@@@@@@@@@@@B@BB@@D@BB@@B@B@@@BB@@@@@@B@BBB@@@FD@@@@@@@@FB@@@@@@@@@@D@@BF@@@@@B@B@B@@@B@B@@@DA@@B@@@@@BA@@JCB@@@B@@@@@BAHADAJAB@DAD@B@FB@@F@JB@@@@@@@@DBB@@BD@D@@@J@@@F@FB@@B@@@D@D@@@D@DAB@@@DAF@F@@@@@B@HAH@D@N@D@D@B@B@@@@BL@@@B@@@@@@@B@D@BAD@D@BAD@@@B@DAB@B@B@@@BA@@B@@@@AB@@@B@@A@@@@B@@@@@BAFADAF@FAB@BAAC@ACEBADADABA@@@@A@ECEACA@@A@AA@@A@@@A@CAC@A@AA@@@@@@A@@@AAA@OIMKAEAAACCAA@KIA@@A@@A@@AA@@@@A@AACAAACAACACAEAC@A@AAC@A@CB@@@@C@A@AB',
                ],
                encodeOffsets: [[116066, 23599]],
              },
            },
            {
              type: 'Feature',
              id: '440106',
              properties: {
                name: '天河区',
                cp: [113.361575, 23.124807],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@@A@A@C@C@M@C@G@GBA@@@@@E@E@CB@@A@CBC@@@C@C@@@A@@@EAE@@@I@@B@@ABC@AB@B@AA@ABC@@@@@@@@@@B@@@@@B@@@B@B@@@@@@@@@@@@@F@@@@@@@@@@@@@@@@@B@@@B@@@B@@@@@D@@@B@@@@@@@@@@@B@@@@@@@F@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@B@@@D@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@D@D@@@B@@@@@@@B@@@@@@@@@@@B@@@@@@@@@B@@@@A@@B@@ABA@@A@@@@@@@@AA@@ACA@@@@@@@A@@@@@@@@@@@@@AFAD@@@@@@@@@@@@AB@@@@@@@@@@@@@@@@@B@@@@AB@@@@@@AB@@@@@@@@@@A@A@@B@@@@@@@@@B@@@@BD@@B@@@@@@B@@@@@@@@B@BB@@@@@@@@@@@@B@@@@@BB@@@@@@B@@@@@B@@@@@@@@@@@@@@B@@@@@@@@@@A@@@AD@@@@@@@@A@@B@@@@@@D@D@@@@@@C@@B@BA@@@B@@B@AB@@@B@@@@AB@@@B@@@@@@@@@@@@@@BB@@@BA@@@@@@B@@A@@@A@@F@B@BB@@@@@@@@B@@@@@@@@@@@@D@B@B@BBBB@@@@@@@@@@@@@B@@B@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@B@@@@@@BB@@@@@@@@@@@@@AB@@B@@AB@@@@@@@@@B@BA@AB@@@B@@@@@@@@@@@@@B@@@@B@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@A@@@@@@@@@@@@B@@@@@@A@@@@B@@@B@@@B@D@@@@@@@@@@@@B@@@@B@ABB@@B@@@B@@@B@@B@@@BB@B@@BB@@@B@@B@@B@@@@@B@@@@@@@@@@B@@@@B@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@BBBBB@@B@@@@BF@@BD@@@@@@@@@@@@DD@@@@@@B@@@@B@@@@@@@@@@@@@B@@@@@@@@@@B@@@@@@@@@BL@B@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@B@@@@@@@B@@@@@@@@@@@B@@@@@BBF@@@@@B@@@@@@@@@B@@@@AB@B@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@B@@@@@DJ@@@@@@@@@@@@B@@@@@@B@@@@@@@@@@@@@@BBJF@@@@@@@@@@B@@@@@@@@@@@@@@A@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@B@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@@JA@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@DDB@BDDDB@@B@@BB@BBBJDDDB@HFB@B@@@B@@@B@B@DG@A@A@@@A@@@A@@@@@ABIEG@AA@@A@@@A@A@A@@@@@A@AAE@AAA@@@AA@@AA@@@BAB@@AHCHE@A@@@@@A@@@A@@BARMHCBABABA@@@@@@@@@@@@AA@@@@@@@@@@@@@@@@A@@@CA@@@A@@@AAA@A@@@@DCB@A@@A@CAA@@CC@@@@@@@@@A@@A@@@@@C@@C@@@@B@BA@@@@B@BB@@@@@@@B@@@@B@@@@B@@@@@@@@@@@@@@@@@@DA@@@@@A@@@@@@@@@@BD@@@@@@@@@@BB@@@@@@@@@@@@@@@@@@B@@@@@@@B@@A@@@B@@BB@@BABB@A@A@@BA@@CCAAAACAAAAC@AAAK@@@HA@GGE@A@@TDBCJEDCBAD@DFAU@AB@L@HA@@@@@A@@AA@A@@BA@@@A@AAA@@C@@AAE@@@@A@@@@@@ACC@@@@@A@AAA@@@@@A@@@@@@@@@A@@@@@@A@@@@@A@@@@@A@@BCAA@@@AB@@@@@@AAAAAAAC@A@@@AA@@A@A@AA@@A@A@@@@ACAEA@EE@@GC@@@@@@@@A@AE@@@@@A@@AAEBE@CBEBAB@@@@A@@@@@@BA@@@A@@B@@A@@@AB@@A@A@A@CBA@@@C@ABC@C@ABC@A@@@@@@@A@@@K@@A',
                ],
                encodeOffsets: [[116096, 23662]],
              },
            },
            {
              type: 'Feature',
              id: '440113',
              properties: {
                name: '番禺区',
                cp: [113.384152, 22.937556],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@CAECCAC@@@CAMCCA@@GACAAAA@CAOAQEEAIAGCGAC@I@UNABABKHEBCH@F@BBBBBD@D@D@BB@D@BAD@D@D@F@LAF@BAH@B@@@@B@@@@@@@BB@@@@DBB@@ABABBBDJBFD@@CHADCFABAB@BCBCDADC@CB@BA@EBCBA@@@@@ABCDA@CACC@@A@BHABAB@@@@CDEDEBA@@BCBEFA@CF@F@D@BBBBD@B@B@D@D@DDDBBB@BBBBB@@@@BADA@IBABAF@D@D@B@@BDBB@BB@B@BB@BABAH@DJABAB@DA@BBDBBABA@CAAB@BAPCJAF@DDFBF@@DBDBDBDBDBDBDBD@DBD@@@BBD@D@B@D@BAD@B@BAD@DDBEF@B@FAF@F@BAH@F@FBB@B@F@B@D@B@@@B@HAFAHAHCDAB@BAB@D@@@@@DAB@D@BBB@D@FBDBDBBBBDBBBD@B@B@@B@@BB@@@@BB@LJB@DBBDBBBFNLPJB@BBBC@ABCBA@A@AAAACAA@ABA@ABAB@DA@@@@DAD@FBR@D@@@B@FDFBFDB@BBDBB@@@BBFBFDDBD@HBD@D@HAH@DAFADAB@DAHC@@@@DADALENGDAB@BABAJEFEBAHKHKNS@A@E@IBM@EBK@AB@@@BQBIDK@CJWHKFIBABEHUHSBAJWPaNOHM@G@G@ECMCQ@O@ASJYN_NA@ABGDKHUHAAABKHMDQHA@SHEDMFA@E@UBGBQ@O@OBEBA@A@EAGEGCGAA@@@CAM@I@I@E@A@GAIAA@CA',
                ],
                encodeOffsets: [[116090, 23448]],
              },
            },
            {
              type: 'Feature',
              id: '440112',
              properties: {
                name: '黄埔区',
                cp: [113.480541, 23.181706],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@ECA@@@C@Q@EAC@CB@@@@CBA@AB@BAB@BBBBDBB@B@BABAD@BAD@@B@@@@@@@BBB@D@DBB@@@B@@@BBB@@@DBFBFDB@@@@@ABCBCBABDF@BBDABA@BB@@@B@@@@BFB@@@@@@@@@HD@@FFB@BFBD@@@@@B@BB@@B@B@BB@@B@@@BBDBBBBBB@@@@@@BA@@B@DB@AB@@@@@B@@@@@B@@@@@@@@B@@@@@@@@@B@@@@BB@B@B@@@@DD@B@@@@B@@@@@BF@BD@@@BB@B@B@@AB@@@BBB@@@B@@@@GBK@A@@BBVCEC@ABCDIFADSC@@@BHF@HGB@@L@BB@BBDBBDBBBBBDD@@AB@@@B@BAAAB@@AA@@@A@@@BA@@@@@@@A@@@@@@@@@@@@@@@@@@@AA@@@@@@@@@@AC@@@@@@@@@@@B@@@@CB@@@@@@@@@@@@@@@@@@@A@@A@@@@@@A@@@@@@AAA@@@@@ABA@@@@@@DD@@@@@B@@@@B@@@@@@@@DD@@BB@D@BB@A@CD@@@@@BBB@B@@@B@@DB@@B@@@@@@@@@@@@@@@@@BB@@@@@@@@@@@@ABABABGDQNAB@@@B@@@B@@@@@BGFGD@BA@AB@@B@@BB@@B@@BB@BBF@B@B@@@@@B@B@B@@@BB@@BFHB@@DB@BBDDBBAD@@@D@BAB@B@B@@B@BBB@@@AB@@@@@B@@B@@A@@@@DA@@BBBB@@BBBAB@@A@@AED@BCBA@@@@B@@@@@BBB@@CBAB@B@BB@@@BB@AFBDA@A@@@A@A@@@AB@@@D@BBBBAFAB@@@BB@@@@@@@@BBB@BD@@@BA@@BCD@BA@AB@@@BAB@@AD@@AD@@@@BBD@F@@@B@B@B@@@@@B@BBBB@@DAB@DCB@BEB@@AB@@@@A@@BA@@@@B@@AAA@@A@@@A@BC@A@@BA@C@@C@C@A@@ACABAD@BABB@@@@BAA@@A@@A@C@C@@@@@@@@@@@@@@@@@@@CADCBBB@@@@@@@@@@@@@B@@BB@B@@BB@@@D@@A@ABA@@B@B@HBD@B@@@B@DBBA@BBABA@@@AD@@BB@@@BC@AB@@@B@@B@@@B@@A@@@@B@BABB@@@@@B@@@H@@@@@@A@@@A@@BBBBBBB@@@BB@@@@@BAAA@@B@@@@@B@@DB@@@BBB@@@@D@B@B@JB@@B@B@@@BB@FBDB@@BB@@@@B@B@BB@B@@@FBDBB@@B@@@@B@B@@@BB@@@@@B@@@@@@@@@D@@B@@@@@@B@@@@@@@B@@@BB@B@@BB@@BA@A@@@@B@@AB@@A@@@@A@@@@AA@@@@@A@A@@@@B@@@@@@A@@@@@A@@@@@@@@@@A@@@@@@@A@@@@@AB@B@@@@@B@B@@@D@BBBB@@@@@@@@@B@@@@@@@@B@@@@@@@@A@@@@@@@@B@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@AB@@A@ABMF@@@@@BBBDDBHBD@@DB@B@@B@BBBBHD@@@B@@@@@@@@@@@@@@@@@@BJAB@@@FAB@@AD@@@BAB@@@@@@@@@@@@AB@@@@@@@@ABA@KDCBABAAA@@@AAA@@B@@ABAB@DABA@C@GA@AA@@@IB@@CB@@A@A@@B@@AB@@BD@@@@@B@B@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@B@@@@@@@B@@@@A@@@@@@@@@@@A@@@@@@A@@@@@@A@@@@@A@@@@@@@@B@@@@A@@@@@@@@@@@A@@@@@@@@@AB@@@@A@@@@@@@@@BD@@BB@@B@@@@B@@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@B@@B@@@@@@@@@@@@@B@@@@@@B@@@@@@@B@@@@@@@@@B@@@@@@AB@B@D@BABB@D@B@D@BB@@@BDD@BA@@BABADA@@@ADCDCDBH@@@@@B@@@@@@@@A@@@@B@@@@@@@@@@@DABA@@@@B@@@B@@@@@@@B@@B@@D@BBB@B@B@H@DA@CAA@AACAAB@B@B@BBDB@B@B@D@B@DB@@@@@BABAB@D@B@DDBBBB@@AB@@AFAB@F@DD@@B@@@@B@FH@@@@@@@@@B@@@@@@@@@@@@@@@@@BB@@@@@@B@@@@@@BB@@@@@@@@B@@@@@@@B@@@@@@BB@@@@BB@@D@@@D@B@@B@@@@@AB@B@@@JCF@HAFADEAG@E@E@@B@D@B@@@DCDABCB@BAFAB@BAB@BADAB@@@@@B@BBDB@@BGHE@@BCBABADA@@BCB@@AB@DCBA@C@@H@LF@@@@@@@@BA@@@@@@@@@@@@@@@@BAB@BAB@B@BABADC@A@A@A@@@@@@@@@@@A@@HE@@@@FABADCBA@@DC@@B@@@@@@@@@@@@@@AB@@@@@BCAC@@@@@@B@@@@@@@@@@@@@B@@@@AB@@@@@@A@@@@@@@@@@@@@@@@@@@@AA@@@@@@@@EC@@@@@@@@@AA@@@@@@@@@@@@@A@@@@@@@@A@@AC@A@@@A@@@@@@B@@ABA@@@A@@B@@@@A@@@@@@@@@@@@@@@@B@@@@@@@@B@@@@@@@@@@B@@@@@@A@A@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@AA@@@@@@@@@@A@@@@@@B@@@@@@@@@@A@@@@@@@@@@@@@@@@@ABA@@@A@A@@@@@@@@@@@A@@@@@@@@@@@@@@@@B@B@BCB@B@@@DC@@@@@@DABAB@@@DA@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@B@@@A@@B@@@B@@C@@@CCA@@A@@@@@AAEAA@@@@@AA@@@@@@@@@@@@A@@@@B@BBBBB@B@@@@@@@@@@@B@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@DABCB@@EB@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@CB@@A@@A@@@@@B@@@@A@@@@@@@@@@@ABC@ABC@@@@CC@@@@@A@@BC@@@AAE@@@@@@@@BA@@@@D@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@A@C@A@@@A@@@@@@@@@@@@A@@@@A@@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@C@@@EB@@@@@@@@@@A@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@B@@@@@@B@DA@@B@D@@@@@B@B@BBB@@@BBB@@AB@BB@A@@@AA@@A@@@@@@@@@@@A@@@AB@@@@A@@AA@@@A@@@A@@@AB@@A@@@A@A@@@A@@@A@@@AB@@A@@@A@@@A@@A@AA@@A@@@A@AA@@AA@A@@@A@@BA@@BA@A@AB@@A@@@A@@@A@@BA@A@@@A@A@@@AA@A@@BA@A@@@@AA@@A@@@@BAB@B@B@@@BBB@@@BA@@A@@A@@AAA@@A@A@@@A@@A@@@AAA@B@@@BAB@B@B@@@B@@A@A@@AA@@@@AAA@AAA@A@A@@@AAA@@@AA@@@A@@AAA@@AAA@@AAA@@AAA@@@@AA@@@A@AA@@A@A@@@AAA@@@A@@AA@A@@@A@@AA@@@AAA@@@AA@@A@@AA@A@@AA@A@@@AAA@@@A@@AA@@@A@AA@@A@@AA@A@@@A@@@A@A@@@A@@AAB@@@@A@@@@@A@@BAB@@@@@B@BAB@@A@A@@@A@@@ABA@@@@@A@A@@@A@@@A@A@@@A@@@A@@@@@@@A@@@AB@@A@AA@@A@@@A@A@@@A@A@@@A@@@A@A@@@A@@@@@A@@@@AA@@@A@AA@@A@@A@@@ABA@@BABA@@@AB@B@@@BA@A@AAABA@@B@@AB@@A@A@A@A@@@ABA@A@A@@@A@A@@@A@A@A@A@A@@@A@AA@@@@AA@@@AAA@@@A@@@AA@@@@A@@BA@@@A@@@@BA@@BA@@@ABA@@@A@AB@@A@@@A@AB@@A@A@@BA@A@@@A@@BA@@@A@A@@AA@@@@@AAA@@@AA@@AAA@@@AA@@A@@@AB@@@@AB@@@@AB@@ABAB@@AB@@AB@@AB@@@A@@A@@@A@@@@@@@ABA@@@A@@@A@@@A@@@A@A@@@A@@B@@@@@@@AA@@@@@@ACACA@AAA@@@@A@@@@@@AA@A@@A@@@@@@@@@A@@@@@@@@@AC@E@@@@B@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@A@@B@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@AA@@@@@@@@@@A@@@@B@@@@@@@@@@@@@@A@@B@@@@@@@@@@@@@@@@A@@BABA@@DA@A@@B@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@A@@@@B@@@B@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@A@@B@@@@@@A@@@@@A@A@@@@B@BA@@@@@@DA@ABA@C@@@@@@@A@@@@@@@@@@@A@@@@@@@AB@AAC@@@KCE@E@GE@@CAACEMAA@CAAAC@ACEAACC@@MICGGGEKAG@GMTGLGLABEFIFABABA@CBMHKFCBCB@@@@GDCBA@CBEBCBG@GBC@C@GAC@CAECEAAA@@A@CAAAA@ECEA',
                ],
                encodeOffsets: [[116149, 23620]],
              },
            },
            {
              type: 'Feature',
              id: '440111',
              properties: {
                name: '白云区',
                cp: [113.273238, 23.157367],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@@A@@B@@E@@@@@@@A@@@C@@@C@@@@@A@@@@@@@G@@@@@@@A@@@@@@@@@@@A@@@@@A@@@@@A@@@C@@@A@ED@@@@CD@@@@@@@B@@@@@@@B@@@F@@@@@@@H@@@D@@BBDFBDDDDB@BBBBBB@@@HDLD@B@@BDBB@B@@AF@D@B@B@D@B@BBB@DADADAD@@ADAB@BA@ADABCBCBABABABADA@ABAD@BG@@@@@E@ABED@BEDBH@FAH@@@@@@@@@@AF@B@BD@@BB@@FBDBF@B@@@DBF@B@DAB@DAF@D@BAF@BAD@D@@CFABCDABC@A@C@A@ABA@AB@B@DAB@D@@A@@BA@A@C@C@A@A@ABABA@@BAD@B@D@BB@@B@D@@ABLBBDAF@@AD@DBF@@@DBD@FBD@B@DAB@@AHEH@DBDHLHLBD@BBDDDBFJDFBFCD@BCDCB@DBFBDBDBDBDCRBBBNEFI@CCGBGAIB@BADA@@HG@@H@LBHAD@BD@BBJJBFBB@FDTBBB@@@B@@AF@BED@J@@BDBDBDB@BCAC@A@@@@@CD@B@FBHD@@@@BBDLFB@BBB@@L@DDDDAF@@@B@@BBB@B@BBB@@BB@BB@BBB@BBB@@BB@@BB@AB@@@BA@@BA@A@@B@@@B@@@B@@@@@@BB@@BB@BBBHDJR@BEB@B@B@D@B@BAB@D@BADAB@BAB@B@@@B@B@@@@BBB@B@FBB@DDBBDDBBBB@B@D@B@D@@@B@B@@@BBBBBDBBBB@D@@@BBBBDB@B@B@B@B@B@B@B@B@D@@@F@HDFHBDDADCBEHAB@B@D@BCBA@CAQ@GBC@ABABAD@BBDB@@DBHDFD@@HHDBB@@@JCDAB@D@BDDFDBB@B@DAD@@@BDB@BBBB@@B@@DBD@BAB@D@B@BB@D@D@F@FBB@DBD@BBBBBBDDDBDBHB@@BABAF@BABAB@@@FAFAHCB@BCHGDEA@A@@B@@@@@AA@C@@@C@@@AA@@@@AA@@@@@@@A@@@@@@@A@@@@@@A@@A@@@@A@@@@@@@AA@@@@@@@@@@@@@@@@A@@@@@@@@@G@@E@A@@A@@@CCE@A@EB@BA@@BA@AACA@C@A@CBABA@A@@@@CAA@C@A@A@A@AC@A@A@ABADBBBB@DBB@@C@G@A@AAA@A@CA@@@@A@@@@@@@A@@@A@@B@BA@C@@@@@@@@@@@A@@B@@@@@@@@@@A@@@@AGDCDCBC@@B@BCBA@AB@@ACC@A@@AAC@A@C@A@BA@A@C@ABA@@@@@@@A@@@@@@@@@A@@@@@@@A@@@@A@@@@@@@@@@@@@A@@@@A@@@@A@@@@@@@@@@@@@A@@@@@@@@@@@@@@A@@A@@@AA@@AC@@@@@@@@B@@@@@BA@@@@@@@@B@@@@@@@@@@@B@@@@@@A@@@@@@B@@@@@B@@@@@@@@B@@@@B@@@@@@@@@@@B@@@@@@A@@@@@@@A@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@A@A@@@@AC@@BA@@@AB@B@@@DA@@JA@@B@@BHBD@B@BA@CBABA@@@AB@BB@@B@BBBADALCB@BA@@@@@@@@BA@@@@@@@@@@@@BA@A@@BC@@BA@E@@BAAI@@@@@@@@@@@@@@@@@@@A@@GCAAAAA@@@@ACA@@ACAGCCAA@A@@@@NEBAB@@@BA@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@A@@@@@@B@@@@@@@@@@A@@@@@@A@@@@@@@@@A@AA@A@C@@@A@A@@@@@ABA@@@@B@@@@@@@B@@@@@@@@@@@@B@@@@@B@@@@A@@@@@@B@B@@@@BB@@@@@B@@B@@@BA@@@A@@B@B@@AA@@AA@A@@A@@@A@@@@@@@A@@@@A@@@@C@@@@@@@@@A@@@@AA@@A@A@@@@@@AA@CAEA@@A@A@@A@A@A@@A@@AA@AC@EAA@@A@A@@@IAA@A@C@@@@@AA@A@@CA@@@A@@@@@AB@BB@A@@@@AA@@A@AAAAAA@@@B@@@B@@@@G@@@A@@@@@A@BA@A@A@@B@@@@A@@@AA@@@A@@BAD@@A@@AC@@B@@ABAB@AABCAA@@@A@C@GAA@A@@@AB@B@BC@@@A@@AA@A@@AA@@@@@@@@@@@@@A@AACDDB@@@@@@@@@@@@@@@@@@D@D@B@@@@BB@AB@@@@AAABC@ABDB@BB@D@D@@@@DAB@@@BADB@@@B@@@BB@BA@@@@@AB@@@B@@A@@BA@AFA@CDA@CB@@AAAAA@@@@@A@A@A@@@E@C@AA@@@@BC@@BC@@BA@A@@BAB@@ADC@AB@@A@@ACA@AA@@@@@@@@AA@@A@EBABAA@A@C@@BA@@B@B@@@B@B@ACBEA@@A@@AAA@A@AB@DA@AA@@@@A@@@@@ABADC@BF@@@BA@ABAA@@AAAA@@CB@@@@@BA@@@@A@@@@BA@@A@AAA@@@@A@ABA@A@C@@BCAACCAAA@@CA@AJ@B@@@@@B@@@B@@@B@BCHA@A@@@A@@@A@A@GEA@CCICAA@AAA@@@AA@CCACA@CC@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@IB@@@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@A@@A@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@B@@@@@@@@@@@@A@@@@@@@@@@@IEAA@@@@@@@@@@@@@@@A@@@@A@@@@@@@@@@@@@CI@@@@A@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@ABA@@@@@A@@@@@@@@@A@@@@AE@A@@@@@A@@@@@@@@@@@A@@@@@@@A@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@AAK@@@@@@@@A@@@@@@@@@@@@A@@@@@@@@@@@@@A@@A@@@@@@@CC@@@@@@@@@@@@AC@@AE@@@@@AA@AAAA@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@A@@A@@@@@@@@@@@@A@@@@@AA@@@@A@@AA@@@AAA@@A@@@@A@@@A@@@AA@BAA@@@@@@A@@@@@@@@@@C@A@@@A@@@A@@@@@@B@@@@A@@@@@@@@@@@@@@B@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@@@@@A@@A@@@@@@@@@@@@@A@@@A@@BABA@@@@@@@@@A@@BA@@@BA@@@@@@@@@@@@A@@A@@@@A@@@@@@@@A@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@A@@@@A@@@@@@@@@@@@AAAAA@A@C@@@@@@@@@@@@@@A@@@@@@A@@A@A@EB@@@B@@@@A@@@@B@@A@@AA@@@@@@@@@@@@@@@A@@BA@@@@@A@@BAA@@@@A@@ABA@@@@D@@@@C@C@@@@@@@@@@@A@AA@@A@@@CAA@AB@@@@@@@@@@@@@@@@@@@@@@AD@@@@@@A@A@@@@A@@@@@@@A@@@@@@AA@@@@@A@@CC@@@@@@A@@@@@@@A@A@@@A@A@A@@@@@A@A@ABAB@@@@@@@@@@@@AAA@A@@AAAC@C@@@@@C@AAA@@@@@@@@@@@AA@@AC@A@@@A@@A@A@@@@@@@A@@@@@@@@@@@@@@@A@@@@B@@@B@@@@@@@@@@@@@@@@A@@@@@@@C@@@@@A@@@@@@@@@@@@@C@@@A@@@CBCB@@@@@@@@@@@@@@@@BD@@B@@@B@@@@@BBB@@B@@@@@@@@@@@BABA@@B@@@@@@AB@@@@@@@@@@@@@@@@@@@@@@@@AB@@@@@@@@@@@@@@@@@@AB@@@@@@@@@@A@@@@@@B@@@@@@@B@@@@@@A@@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@@@@@@@@@A@AB@@EBA@A@@@@@@@ABC@@@A@@@@@@@@@@@A@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@@B@@A@@@@@@@@@@@@@AB@A@@@@@@A@@@@@@@@@@@A@@@@@@@@A@@A@A@@DA@@@@@@@A@AA@@AGA@A@C@@@@@@@@@@@@@@@A@@AC@A@@@A@A@A@@A@@@@@AA@AAAA@@AAACA@@@@@@@@@@@@@@@@A@@AAA@AED@@@BA@@BA@CBABCHAD@@A@@@@@AA@ECGAA@B',
                ],
                encodeOffsets: [[115930, 23698]],
              },
            },
            {
              type: 'Feature',
              id: '440115',
              properties: {
                name: '南沙区',
                cp: [113.525165, 22.801624],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@H_EMSKmK[ASAiBSBCLUveKLIFOJCBK@A@EBEDCBIHCFAAEDEEGFEE@BEHGLADCBEL@BKRCFEJIPGN@B@@@BD@D@FBBRUPMJKHGFKHIFABEBMJQNABKHGF@@ABMLBB@@@@FN@@eLCBMBCBG@E@K@EBKDIDMHCBA@ED@BGDIF@@@@SLCDIFCBGHGDABCF@BCHCJAJ@@@DB@DAHBFBBBDBDBDCBABBBBFBB@@@DDB@JJBBBBDB@@BD@B@@CBEBABABABAB@BEDCBCDC@ABA@A@CAC@@@A@A@ABABC@KCC@A@AA@CEAA@@AEAAF@BA@A@CAE@AAA@EFABEDG@CBKDGDCDAD@DAJ@XI@ABAB@BCDAFGA@DB@AFJFCHAHDBB@@DABJ@D@HBHDJBFBRFPBDBB@BBDBHB@@DBNDDB@@D@DBFDDBDBB@JBHBB@F@J@J@N@DB@@B@HBHDHFFBB@B@FAPAP@R@HAVAF@B@NEFCTGB@RGNCLGBABBVGLGHCBAB@`MZMTI@GHKFKNSZ[TUDCFEBAFERUDABABCJIVYHGHI@@TWHGNQLMNQDGVsTmTiV§R',
                ],
                encodeOffsets: [[116467, 23092]],
              },
            },
            {
              type: 'Feature',
              id: '440114',
              properties: {
                name: '花都区',
                cp: [113.220463, 23.403744],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@BA@ABABC@@@@BA@ABC@CAA@C@A@A@CAAA@AAA@A@C@AAA@C@A@@BA@A@ABABC@ABAAA@C@A@A@@@A@@@@@C@A@CBA@AAA@AA@@E@@DFFFHBHB@DB@DAB@BA@AB@BBH@FADCDABE@EDGHCDBBB@@BABAFADA@A@A@@B@@@F@FBDBH@@@FBB@BFB@@@DADCBCBE@@@@CA@CBEFABBF@@@@DHBDDDDDFDBFFDDFFH@B@BABABABABC@A@C@@@A@AAAAA@CEA@AEEEEACAAEA@CB@DABAD@D@F@BA@AB@@A@A@AA@@AAA@@@ABA@ABA@ABA@A@A@ABA@AAC@A@C@A@A@ABAB@@@B@@@@@B@B@D@D@D@B@BA@@BAB@@@BA@@BA@A@CDBB@@DBDDA@ABCB@DBBDBD@@B@@@B@@@B@@A@A@@@AB@@B@BD@BB@D@B@@@@@@B@@@BABADAB@B@@@B@BB@DBB@@B@@BB@B@@B@@@BA@@B@@BB@@B@@BB@BB@@@B@B@B@@@@@B@BBABA@AB@BABC@CH@B@@ADC@@@AB@@ABAD@B@BAB@DAB@DA@@BA@@BA@AB@B@B@@@BB@@BLD@D@FABABCCC@EAA@AECECCC@C@CCCCCCACE@A@@BAF@FBDBFBF@HDBDBDAB@B@DDDD@FB@BD@@BJAD@D@@D@DB@BB@B@HAB@DADBDBDB@BBCDABAHAF@F@BBHB@@FEBABBEF@BJ@@BBBCB@BPHDCBARB@BBDH@LGB@B@@@FB@@@@FBHHBD@B@@BB@BBBBB@@B@@@B@@BB@@@B@B@@BB@BAB@@B@@H@BHHHFDHADAHHH@DA@@D@DDHBDANHDFEHABBBB@BBFIHDFFDBHALCF@LAACFA@AJCFDDB@D@B@BFBB@FAHHDCALDF@A@I@CHBLBTBDBBB@BABEHDDFBBJB@DBBBB@HHBDHADF@FCDGFBDBB@@B@@BBBABADCBCBABABABABBHBFBHAF@B@@DBDDDBDBDDDBB@D@DAB@BBD@@BB@F@@J@FBBF@DAFCDAF@DEBAB@BD@@@D@D@BCF@BBBGPDBLI@@DBBBDDB@BBB@BBD@B@D@B@B@DBB@BB@BBB@@BBDBFBDBBCBCBEB@@AB@@B@@@BBAFGHEB@L@BAB@@A@AB@DAD@B@F@B@D@D@DABABABADABABABABAB@D@D@D@@@B@@@B@B@B@@AB@LIFCEE_CGGBCFENBBAB@D@DCFCFCBADABAB@BAB@@C@ABC@A@C@ABA@CBKBABAFBDBF@@BBBBBDBFADAB@@@D@@@HAF@DC@@DAB@BB@B@DPDFADAF@F@F@DDB@BBB@DB@@@@B@@@B@BAB@BADAB@DAD@@AB@@@B@@A@@BA@A@A@@BA@@@A@A@@@A@@BAFGF@DB@@DAAC@CA@DAB@BBD@B@@AACAA@AA@CBABA@@@CA@@DC@AAEDCFABABCBCCACCACEEACACCC@EDM@@BABAD@B@D@B@DAD@B@FFDA@@DADADEACBIFC@@@AF@BAAGCC@@ACA@AAAAAAAAAAA@@@@ACGDCDAH@DAFCFEBABADCBA@A@ABC@@AAAA@AAA@@GACACACCAAAAAAC@CAA@EAE@C@C@A@@A@A@CBA@AAC@CA@@@AAAAA@AC@@C@CBA@A@CACEACC@A@CBID@@A@CAGG@@ECGCCA@@CAAAC@ABAB@BAD@HBR@DABADC@A@A@GBAFCDCBACEGGCE@@@C@A@A@A@A@A@A@A@A@A@ACAA@A@@@CAAAAACAAAA@@A@A@@@C@A@C@A@A@AACAACCA@CAA@E@AAA@A@@A@A@@@A@A@ABA@CBABC@A@ABA@C@A@A@A@AFQ@CIAGAAA@@AA@@A@@@@A@@@A@@@A@@@@BAB@@AB@@A@@BAA@@AA@@AA@AAA@AAAA@@AA@AAA@A@AA@@@A@@BECCCCK@@@AA@AEACKAA@@@@GCEAA@C@@D@@@@@BBDADA@ACACAC@@@IFC@ABE@@@A@@AASAECA@EAIAAI@AACC@GBKAG@@@GH@@CBABA@BJAHDH@DEJMFAAQACDCACACAEACAA@CDADC@EDEAICAECCAC@AACGKGKAC@CFGBG@@BA@C@AAC@EAC@C@@AE@CBC@@BEACKAABEFC@EBA@KHKNEMACS@AB@@@@AFKMAA@AF@@A@ABA@A@A@@ACEGMBC@A@@@C@A@AACA@@AA@@@@@@@AA@AAA@@AA@A@@@C@@AC@E@@@C@C@A@A@@A@@@A@@@A@@BCBABABC@@@A@A@CBA@ABA',
                ],
                encodeOffsets: [[115792, 23828]],
              },
            },
            {
              type: 'Feature',
              id: '440117',
              properties: {
                name: '从化区',
                cp: [113.586679, 23.548748],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@@A@ECCIC@CEEIGGB@@CA@@AA@A@@CEACCCAACAAAAAA@A@AAAAA@@AAA@@@A@@@AAA@C@A@AA@@@@@ECCCACCCAC@AAC@C@@BA@@@ABA@A@ABAAA@@KDEA@EACAC@G@A@C@CAA@AACKEG@@@@DABCDA@@BA@AD@@CBABABAD@@GFAH@@CAAAA@@@@@A@CBABA@ABA@EBABA@ADCBCD@@A@C@A@@@@F@FBHCFEBGBE@ID@@CFGHADA@GDEBEB@@A@ABABE@ABABBB@BBBBB@@AD@B@BABCDABABEFEDCBG@CBCDDH@B@@B@BBBBBBBBBBB@BD@@DDBHABE@@B@@EDAJBDCFCBCB@@CBEEA@C@CBA@C@A@C@ABAB@@CN@FDDBDBDFFBDDDDBADADABEBCDBF@BCD@@DB@@B@BADAB@@BBBBD@BA@C@AAA@CBB@@DBDCB@@CAE@EHAB@@@B@@@B@B@@AB@@@B@BAB@@@BA@@@A@@BC@CBA@CBABA@ABA@@@A@@@@@CAA@AAA@CCE@E@E@CBEBOC@C@AAAA@CB@@CDE@GB@@C@@@A@CBEBCAAAAA@AE@CAEAABABAL@DAB@B@D@BAD@B@DA@ABA@ABCBABEDEDCDC@A@ABMAEFADHH`DFFEDKJA@@BA@A@A@@@A@@@C@C@C@A@ABABABABCBABABABCBC@C@A@E@A@C@CBA@@B@BA@ABK@A@GFEHAB@B@@BBBBDBBBB@BBBBB@BBBDBB@BBF@FBDBF@BB@@BBB@BB@@B@@@BA@A@ABC@CBA@CBA@@B@B@@@B@@B@BBB@D@D@D@B@DBB@D@DAD@BAB@DAB@D@B@FBH@DA@@B@DBB@BB@B@B@B@B@DAD@B@DB@B@B@B@B@B@BBB@BBBD@F@DB@@BBBB@B@BBD@B@B@B@B@BB@@BB@B@B@D@@BB@B@@@BBBBBBDBB@B@B@B@B@@@B@@BBBDBFDDBF@BBF@DBD@BBDBBBBBBFAF@DFB@@B@B@@@B@B@@@H@FBFBHBDBAB@BAB@@@B@B@D@@@JAHBHC@@@@@ABA@ABAB@FADBF@F@@@@@@@@@D@B@D@D@BBB@BBBBB@B@@@B@@@BA@ABABAB@@@@@FDB@FDB@F@B@BADA@CIAFCB@BEAAFAB@DCBAHCB@B@B@FABAFADC@@CEBA@ADABCBA@@@GACHC@@BAHEHAFF@@DAFAB@B@B@HED@HBDBH@FCH@DBDDFBB@@@B@BABBB@B@DBDBDDFBDBFDFBBBBBCDI@HFJBDA@@D@B@D@B@B@FAJI@A@GD@DABABA@A@@@AAA@@CCBGJD@@B@BADABABABAB@@@@AF@D@D@@I@AHCBAB@BAB@B@BA@ABA@@B@@B@DBBDFB@BBDD@BRLBB@@@@@@@@ABCDAFBBBBBBJDBBFF@DAFFDFBB@B@B@D@@@BAD@DFA@ADEDE@CF@JBBB@DB@DAD@D@HFFD@@BABABGJHLDJ@BCBED@BAFAD@B@BAB@BADAB@B@@ABA@@BA@ABABC@GLAFHDDDCDE@@DB@HANLLJ@BADBDBF@@FB@DBFBD@@@BB@@@DDDBFB@BJBDA@A@ABBFBDAF@@ADCDA@@HBRABABAFB@@@JFPF@FEBCB@F@FABCBCHAHFFDDBF@DD@DCBADCJAFBBDDBLCHELGDBFDDBDLGBDB@D@DEAGB@FB@FB@D@BCDAF@FDFDB@DADCDC@B@@D@HD@B@@F@BDFHBDDBDJB@BBBBD@@@FHFL@BFN@B@HDBDBDBBF@BHBHAD@F@@@D@DBBADC@ABBB@D@BBDB@BBBBBB@DBDBFBDBB@BBB@BBBBBBBBBBDBDBDBD@FBD@F@DBDBFBDBDD@BB@BB@@BBDBR@DBD@D@BC@CDADADABBDD@DDDBB@BDCBCH@DBD@D@DEBCFAHBHDFBJDFA@@B@B@DBD@B@@C@ADABA@@@AD@DDH@LHNBDADADBHFDACEHBL@FBBCDCFDD@HDHAJ@FFB@B@BBB@@ABCBABBDCB@@A@@BAB@BA@CB@@BB@D@B@DAB@B@B@BA@@BAD@@AB@@ABA@AAABA@ACC@C@C@CBEDADA@G@A@A@AB@BC@AB@BCB@B@BCAA@CB@@C@C@A@AACCC@CBCB@FABA@ABA@CBCBCAA@CDC@@BAAABADEBAB@BA@@DCACC@@AAGC@@E@A@@@G@A@CGAECICCECE@CAGDIJAJGGEKCAEBCDADCJEPADEFK@ABACBUCEAGACCAA@@CC@EIEECCIAEC@CHCD@DAFCAC@EBA@@B@BBJJDBFBFCBEAECAEGG@@CAACAAAA@@CAAAA@CAA@A@CAA@C@C@A@C@C@CACAAA@A@@@C@@@C@C@C@A@CAA@AAAAGC@A@GBICA@CEECEBGF@@ABA@A@C@C@@@A@A@@@A@@A@@@AA@@@@ECAEBAAIAECG@A@@AA@AEACACEIEAK@C@A@CG@G@CAKA@@@EEEKAAAACACACA@@AAC@CAA@CAA@C@C@A@C@EACA[AAAGGBAPG@EQDACAE@GCIKAQBK@A@@@@@@@@CBA@CDCB@B@B@BAB@B@@AB@@@@AAA@@AA@@@A@AAA@AAA@AA@A@AAA@A@A@A@AA@@AA@A@@@A@@AAAC@A@@@A@@B@BA@A@ABA@@BA@@B@@@B@B@BBD@B@F@D@F@@AB@@@@A@A@@AA@AEAACKAEAAEEBEAOACAEDCBABA@EACAGBC@KBK@ECKEQECAGEAABCAC@@@C@CEGAGACCE@A@A@AAA@AAAAA@AA@A@AAA@C@AAAA@@AGBK@ABA@@@A@A@A@A@@BA@A@@@AB@@@@A@A@A@@@A@A@A@A@A@AA@A@A@A@A@A@ABA@@@A@AA@@AAACACAEACCCAAAA@AAA@AAA@@@AFEDEAAEC@@CAA@AAEACEAEEEGCA@A@A@@@A@A@@@@@@AAAAAACAAA@A@@@A@A@AA@@AA@@BEAAAACEG@C@AE@@@AAA@A@C@A@C@AAA@AA@AAA@AAAAA@AC@AEEE@IAA@C@ABC@C@C@A@CAAACAAAACAAAAAAIE@@IAA@',
                ],
                encodeOffsets: [[116351, 24014]],
              },
            },
            {
              type: 'Feature',
              id: '440118',
              properties: {
                name: '增城区',
                cp: [113.810627, 23.261465],
                childNum: 1,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  '@@AACCCAECGC@@EA@@EC]EA@@@A@@B@@@@@@@B@@@@@@@@@@@B@@@@@@@DAB@BCB@@@@@@ABA@@@@@@B@B@@@@@B@@@@A@@@@B@@@@@@@@@@@@@@@@@@A@@@@@@@@@A@@@A@@@@@@B@@@@A@@@@@@@@@@@A@@@@@@@@@@@A@@@@BCB@@ABAB@@@B@@@@@@@@@@@@@@A@@@@B@@@@@@@@@@@@A@@@@@@B@@@@@@@@B@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@A@@@@B@@@@@@A@@@@@@@@@@@A@@@@@@@@@A@@@@@@FBD@@@@@@@@B@@@@@@@@@B@@@@BBB@@@@@@@B@@B@BBB@BDBD@@@@@@BB@@@@@@A@@@@B@@@B@B@@@B@@@B@@@B@@AB@B@@@@@@@B@@@BB@@@A@@BA@@BA@@BA@AB@BA@@B@@A@@B@@A@@B@@@BB@@B@@BB@BB@@B@@BB@B@@@@BB@@@B@B@@AB@@@B@@@BAB@@@B@BA@@B@B@@@BA@@B@B@@AB@B@@AB@@AB@@@@@B@@AB@@@B@@B@@B@@@B@@BB@B@@BB@@@@BBB@@@B@B@B@B@B@@@B@B@@@B@B@B@BA@@B@B@B@B@@@BA@@@AB@BABBB@B@@A@@@ABA@@B@BA@AB@BA@@B@@@@BB@@B@B@@BB@@@@@B@@@@@B@@@B@B@@@B@@@B@B@@@B@B@@@BB@@B@BA@@B@@@B@@@@@@@B@@@B@@@B@B@@@B@@@B@B@@@@AB@B@@@B@@@B@BA@ABA@@@@@A@AB@@@B@@@@@B@@A@BB@@@B@@@B@B@@@B@@@BBB@@@BB@@B@B@@BB@@@B@@BB@B@@@BBB@@@BBB@@@BB@@B@@BB@B@@BB@@@B@@@BBB@@@B@@BB@B@@@B@BB@@B@B@@BB@@@@BB@BB@BB@@BB@BB@BB@@@B@@BB@@B@BB@@B@B@B@BBB@BB@@@@BB@@@B@BA@@@A@A@A@AB@@A@B@BB@@B@@@@B@@@B@BB@BB@@@BB@@@AB@@A@AA@@A@A@A@AB@@@@@BB@@B@@B@B@@AB@B@@B@@@B@B@@@BAB@@@B@@@B@@@BA@@B@BAB@@AB@@@B@@@BBB@@BBB@@@B@@@BBB@@@@B@@@B@@@BA@@B@@@B@@@B@@@B@B@@@BA@@B@@@B@@@B@@BB@@@B@@A@@B@@@B@@@@@@@@@@@BB@@B@@@BAAA@@BA@AA@@A@AAA@A@@@@@C@A@@@CBA@@@@@@@@A@@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@@BB@@@@@@@@@@@FA@@D@@@@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@B@@B@@@@@@@@@@@@@@B@@@B@D@B@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@A@@@@C@@@@@AB@@@@@@@@BF@B@@AD@@@B@@@@DD@@@@AD@BAD@B@@@@@@@@@@@B@@A@@@@@B@@@@BA@@D@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@FA@@DABA@C@@@@@@B@@@@@@@@@@@@@B@@@@@@@@@@A@@@@@@@@@@@AAAAA@A@A@@B@@@@@@@@@@@@@BB@@@@B@FBBB@@@@B@@@DB@D@@@DA@@@A@@@@B@@@A@@@@@@A@@@@@@@@@@@A@@@@@@@@@@@@@A@@@@@@@@@CB@@A@ABCB@@@@@@CD@@A@A@ADA@A@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@B@B@@AB@B@@@@@@@@@@@@@@@@@B@@@@@@@@A@@@@@@@@B@@@@@@@@B@@B@@@@@@@@@@@@@B@@@@@@@@@@@@@@@@@B@@@@@@@@@@@@@B@B@@@@A@@@@@@@@@@@@A@@@@@@A@@@@@@@@@@@@@@@@@@B@@A@@@@B@@AB@BA@@@@@@@@B@@@BBD@@@B@@@@@@B@@@@@@@@@@@@@B@@B@@@@@@@@FD@@@@@@@@BB@@@@@@@@@@@@@@@@@@@@@B@@@@A@@B@@A@@@@@@@@@@@@@A@@@@@@@BDAD@@@@A@@B@@@@@@@@@@@@A@@@CD@@ABCDABEB@@@@GF@@@B@@@@@@@@@@@B@B@BCDABABA@A@ABA@AB@@@@@@@@@@@@@@@@AB@@@@@@@@BD@BBB@D@D@B@HBDBD@FFBLC@@BBAB@B@BAB@B@@AB@@@DBD@BBDDDBDDDFD@@@@B@@B@B@DBB@B@@@B@@BB@BB@BBBBB@B@BBBBDBBBDDBDDF@@@BBB@@DB@@HAJHFF@DJDDD@F@BB@JB@@JFBBBBBBBDBBDBBBDBB@D@D@D@BAD@B@JBF@FF@BBDB@BBBBB@BBB@@BBB@B@D@B@D@BBB@B@@BFD@H@DFBBBBAF@@BB@@BBB@B@@@B@B@BBBDBBBB@B@@@@B@B@@@B@B@B@HDFFBFDFFBBBB@DB@@FDBBCFEF@B@@BB@BBB@BBBBBDDBDBFBDBDBB@@BBB@@@B@BAB@B@B@B@B@B@@B@B@B@B@B@B@@@B@B@B@@A@@B@@@BAB@@@B@B@B@B@@AB@BALBH@@BBBBD@B@BBB@B@@BBBBB@BBB@B@B@BDFBDBHFH@D@D@@BDADBBHFDBRFLFFDL@LAD@HADBFBB@BADAFCDBPBFBFABFFBLBBDFB@AB@BAB@@AD@B@B@BBB@B@B@FAFABABAB@DABAD@BADABA@C@CBA@A@AAAACAA@CAEBA@ABABAD@@AB@@A@@@AA@AA@@CAAAA@AA@AAAAA@CAC@@AA@A@A@A@@@A@AB@B@BAD@B@BABADA@ABA@ABA@A@A@@@A@AB@@AB@@AB@@A@@@A@A@A@A@ABA@ABA@A@A@A@@BA@A@@BABABABAD@DAB@D@B@DAB@DABABABCAC@A@A@A@@@A@@BA@ABABCBAJABCBCB@DABAB@BAB@@ABABA@A@ABA@AB@BABAB@D@B@B@B@D@D@B@@AFCDGDCF@N@@@LA@@@@@AB@@@AACIEEAAAAA@A@A@CBAB@@A@AB@A@ABCBADCDAD@D@B@DBB@B@DBF@DAD@B@D@DDD@B@B@B@BADAD@B@D@DB@@@@BAB@BA@@BAHGCAEGAACAGAK@E@KD@@A@@@@AAA@@@A@A@CAC@CBA@A@A@AB@@A@A@A@@CMBEBADCBABABABA@ABAD@B@D@D@D@JCJBJF@@BAB@BA@C@@@A@AAA@AAAA@@AAA@ABA@@@ABA@A@@@AB@AA@@@AA@@A@@AA@A@@@@@A@@@A@A@@BABABABABAD@BCDADADA@@BABA@@BA@A@A@A@AAA@AA@@AA@@AAAA@@AA@A@A@CCEACCEAAAACBEDEDCBGDEBEBIDELGDCB@@C@@@@@A@@AAAA@@CEAAACCCG@@A@@AAA@@@A@A@AB@@A@@@@A@@@ABAB@BABAB@@C@A@IFE@ABEHGAG@@@C@C@ABEA@ABA@A@C@C@GDEBG@AB@FCBMHKDCDCBBHDLAD@HA@@B@BA@ABCBC@ABCBA@C@A@IHEFGAIA@@EAGBKBKB@@A@A@@BC@ABABABC@A@CAC@AAA@@@AAAA@AAA@CAAAA@AAAAA@@@A@A@@@A@A@ABA@ADABC@A@CB@@@@AB@B@@@@@B@@@B@@@@@@A@@A@@A@AAAAA@A@I@ACEACAI@A@AAGCA@CFE@AAGAAAA@AAA@AAA@AAA@ACA@AAAA@AAAAA@@AAA@@AA@A@@@AB@@@B@@AB@B@B@BABAB@BA@AB@BAB@BAD@BAB@BABA@AAGACCAAIFGDM@@B@@CFIDEFABEAC@EAAI@GB@@AIAEGC@@@AAA@@AA@AAA@@@A@A@@@A@AA@@A@@@A@@@A@@@A@@B@@@@A@C@ADGDGHAJBHC@ECICAACKCC@EBG@ABI@C@CAAAAA@@ACCCA@I@EACEAEEAECAA@@@AAA@A@ABE@@AAAEACAABCCE@A@EA@@EC@@MAB@@EDIBCBGDABEBA@ABKDGBMBIAOAGBC@IDEBE@IAC@KAI@E@GFEFKHEDCBC@E@E@IACAA@GACAIEECCAGC@@GEAAAAGEGEKCG@@@GAG@GEIC@@A@@FBD@B@@ABC@A@@@@@A@AAA@A@@@AB@@A@@@@@@@@@@@@@AB@A@@@@@@A@@@@@@@AA@@AAA@@@AAEC@@AA@@@A@@BABA@@B@AA@AAAACCAG@E@IAIBM@K@IEAA@@AC',
                ],
                encodeOffsets: [[116331, 23653]],
              },
            },
          ],
          UTF8Encoding: !0,
        })
      : void D('ECharts Map is not loaded')
    : void D('ECharts is not Loaded');
});
