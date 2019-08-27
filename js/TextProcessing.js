///////////////
// TextProcessing class to handle turning a block of text (arabic or otherwise) into usable game objects

class TextProcessing {
  constructor(game) {
    this.game = game;
    //this.text = '';
    this.alphabet = 'اإأآبةتثجحخدذرزسشصضطظعغػؼفقكلمنهوىي'
    this.ZWJ = String.fromCodePoint(0x200D); // Zero-width joiner
    this.ZWS = String.fromCodePoint(0x200B); // Zero-width space (One could alternately use 0x200C, zero-width non-joiner)

    // Sample text to draw from
    this.text = `أبو القاسم عبيد الله بن عبد الله بن خرداذبة المتوفى في حدود 300 هـ.
مؤرخ وجغرافي في القرن الثالث الهجري. قيل أنه أيراني الأصل وكان معتنقاً دين الزردشتية ثم انتحل دين الإسلام على يد البرامكة ويظهر من ذلك أنه كان من أهل خراسان. اختلف المؤرخون في سنة ولادته ووفاته فذكروا تاريخين لولادته أحدهما 205 والآخر 211 هـ.
هاجر ابن خرداذبة في أوائل حياته إلى بغداد وبدأ يتلقى العلوم على يد والده كما وأخذ فن الموسيقى على يد الموسيقي الشهير في ذلك العصر إسحاق الموصلي.
عُهد إليه في أيام خلافة الواثق بالله (227 ج 232 هـ) منصب «صاحب البريد والخبر» ، ويبدو أن عمله هذا أدى إلى أن تتسع دائرة معلوماته عن وضع الطرق ونسبة الخراج والأوضاع الجغرافية والإدارية في إيران والبلدان الإسلامية وغير الإسلامية وسبب تأليفه هذا الكتاب.
تقربه إلى الخليفة المعتمد العباسي وحضوره في مجالسه ومحافله الأدبية والفنية سببت خوض ميادين أخرى غير الجغرافيا كالأدب والموسيقى والطبخ وغيرها مطالعة وتأليفاً.
آثاره
أحصى ابن النديم في فهرسه عن المترجم له ثمانية كتب وهي: أدب السماع، جمهرة أنساب الفرس والنوافل، المسالك والممالك، الطبيخ، اللهو والملاهي، الشراب، الأنواء، الندام والجلساء.
وذُكرت في مصادر أخرى كتابين آخرين وهما: الكبير في التاريخ وأخبار ابن خرداذبة.
ولكن لم يبق من هذه الآثار العشر إلا كتابين وهما: المسالك والممالك ومختار من كتاب اللهو والملاهي.
اعتماد علماء الجغرافيا على ابن خرداذبة
اعتمد على ابن خرداذبة في منهجه الجغرافي الكثير من علماء الجغرافيا التالين له أمثال اليعقوبي وابن فقيه وابن رستة وابن حوقل والمقدسي والجيهاني والمسعودي. 
بسم الله الرحمن الرحيم اطال الله تعالى بقاءك يا ابن السادة الاخيار والائمّة الابرار منار الدين وخيرة الله من الخلق اجمعين وادام الله لك السعادة وكثّر لك الزيادة من جميع الخيرات ووفّقك لسبيل الصالحات وجعلك ممن ارتضى افعاله وزيّن احواله فهمت الذي سألت افهمك الله جميع الخيرات واسعدك الى الممات وافلح فى الدارين سهمك ووفّر فيهما قسمك من رسم ايضاح مسالك الارض وممالكها وصفتها وبعدها وقربها وعامرها وغامرها والمسير بين ذلك منها من مفاوزها واقاصيها ورسوم طرقها وطسوقها على ما رسمه المتقدّمون منها فوجدت بطلميوس قد ابان الحدود واوضح الحجّة فى صفتها بلغة اعجميّة فنقلتها عن لغته باللغة الصحيحة لتقف عليها وقد رسمت رسم لك فوز الحقّ فى جميع مأمولك ومطالبك ما رجوت ان يكون محيطا بمطلوبك وآتيا على ارادتك كالمشاهد لما نأى والخبر بما قرب وصنعته كتابا (2) افتتحته بالحمد لله ذى العزّة المنيعة والنعمة السابغة الذي انشأ الخلق على ما اراد وبيّن سبيل الحقّ للعباد لم تشركه فى خلقه الآراء المتوهّمة ولا ظنون الرّويات تعالى الله عما يشركون وصلّى الله على محمّد نبيّه وعلى الاخيار من عترته وسلّم كثيرا 
هذا كتاب فيه صفة الارض وبنية الخلق عليها وقبلة اهل كلّ بلد والممالك والمسالك الى نواحى الارض تأليف ابى القاسم عبيد الله بن عبد الله ابن خرداذبه مولى امير المؤمنين قال ابو القاسم صفة الارض انها مدوّرة كتدوير الكرة موضوعة فى جوف الفلك كالمحّة فى جوف البيضة والنسيم حول الارض وهو جاذب لها من جميع جوانبها الى الفلك وبنية الخلق على الارض ان النسيم جاذب لما فى ابدانهم من الخفّة والارض جاذبة لما فى ابدانهم من الثقل لأن الارض بمنزلة الحجر الذي يجتذب الحديد، والارض مقسومة بنصفين بينهما خطّ الاستواء وهو من المشرق الى المغرب وهذا طول الارض وهو (3) اكبر خط فى كرة الارض كما ان منطقة البروج اكبر خطّ فى الفلك وعرض الارض من القطب الجنوبىّ الذي يدور حوله سهيل الى القطب الشمالىّ الذي يدور حوله بنات نعش، فاستدارة الارض فى موضع خطّ الاستواء ثلثمائة وستّون درجة والدرجة خمسة وعشرون فرسخا والفرسخ اثنا عشر الف ذراع والذراع اربع وعشرون اصبعا والاصبع ستّ حبّات شعير مصفوفة بطون بعضها الى بعض يكون ذلك تسعة آلاف فرسخ، وبين خطّ الاستواء وبين كلّ واحد من القطبين تسعون درجة أصطرلابيّة واستدارتها عرضا مثل ذلك الّا ان العمارة فى الارض بعد خطّ الاستواء اربع وعشرون 
درجة ثم الباقى قد غمره البحر الكبير، فنحن على الرّبع الشمالىّ من الارض والربع الجنوبىّ خراب لشدّة الحرّ فيه والنصف الذي تحتنا لا ساكن فيه، وكلّ ربع من الشمالىّ والجنوبىّ سبعة اقاليم وذكر بطلميوس فى كتابه ان مدن الارض على عهده كانت اربعة آلاف ومائتي مدينة
قبلة اهل كلّ بلد
فقبلة اهل ارمينية وآذربيجان وبغداد وواسط (4) والكوفة والمدائن والبصرة وحلوان والدينور ونهاوند وهمذان واصبهان والرّىّ وطبرستان وخراسان كلّها وبلاد الخزر وقشمير الهند الى حائط الكعبة الذي فيه بابها وهو من القطب الشمالىّ عن يساره الى وسط المشرق، واما التّبّت وبلاد الترك والصين والمنصورة فخلف وسط المشرق بثمانية اجزاء لقرب قبلتهم من الحجر الاسود، واما قبلة اهل اليمن فصلاتهم الى الركن اليمانىّ ووجوههم الى وجوه اهل ارمينية اذا صلّوا، واما قبلة اهل المغرب وافريقية ومصر والشأم والجزيرة فوسط المغرب وصلاتهم الى الركن الشأمىّ ووجوههم اذا صلّوا الى وجوه اهل المنصورة اذا صلّوا، فهذه قبل القوم والنحو الذي يصلّون اليه
السّواد
ثم ابتدئ بذكر السواد اذ كانت ملوك الفرس تسمّيه دل ايرانشهر اى قلب العراق فالسواد اثنتا عشرة كورة كلّ كورة أستان وطساسيجه 
ستّون طسّوجا وترجمة الاستان احازة وترجمة الطسّوج ناحية، (5) كورة استان شاذ فيروز وهى حلوان خمسة طساسيج طسّوج فيروز قباذ، وطسّوج الجبل، وطسّوج تامرّا، وطسّوج اربل، وطسّوج خانقين
الجانب الشرقىّ سقى دجلة وتامرّا
كورة استان شاذ هرمز سبعة طساسيج طسّوج بزرجسابور، وطسّوج نهر بوق، وطسّوج كلواذى ونهر بين، وطسّوج جازر، وطسّوج المدينة العتيقة، وطسّوج راذان الاعلى، وطسّوج راذان الاسفل كورة استان شاذ قباذ ثمانية طساسيج طسّوج روستقباذ، طسّوج مهروذ، طسّوج سلسل، طسّوج جلولا وجللتا، طسّوج الذيبين، طسّوج البندنيجين، طسّوج براز الرّوز، طسّوج الدّسكرة والرّستاقين كورة استان بازيجان خسرو خمسة طساسيج طسّوج النّهروان الاعلى، طسّوج النّهروان الاوسط، طسّوج النّهروان الاسفل اسكاف 
سقى دجلة والفرات
كورة استان شاذ سابور وهى كسكر اربعة طساسيج طسّوج الزّندورد، طسّوج الثرثور، طسّوج الأستان، طسّوج الجوازر كورة استان شاذ بهمن وهى كورة دجلة اربعة طساسيج طسّوج بهمن أردشير، وطسّوج ميسان وهى ملوى، وطسّوج دست ميسان وهى الأبلّة قال غيلان بن سلمة الثّقفىّ ظلّت تحيد من لدّجاج وصوته وصريف باب بالأبلّة يغلق وطسّوج أبزقباذ، وخراج دجلة ثمانية آلاف الف وخمس مائة الف درهم
سقى الفرات ودجيل من غربىّ دجلة
كورة استان العالى اربعة طساسيج طسّوج فيروز سابور وهو الأنبار، وطسّوج مسكن قال ابن الرّقيّات انّ الرّزيّة يوم مسكن والمصيبة والفجيعه وطسّوج قطربّل، وطسّوج بادوريا كورة استان أردشير بابكان خمسة طساسيج طسّوج بهرسير، طسّوج الرّومقان، طسّوج كوثى، (7) طسّوج نهر درقيط، طسّوج نهر جوبر 
كورة استان به ذيوماسفان وهى الزّوابى ثلثة طساسيج طسّوج الزاب الاعلى، طسّوج الزاب الاوسط، طسّوج الزاب الاسفل كورة استان بهقباذ الاعلى وهى ستّة طساسيج طسّوج بابل، طسّوج خطرنية، طسّوج الفلّوجة العليا، طسّوج الفلّوجة السفلى، طسّوج النّهرين، طسّوج عين التّمر كورة استان بهقباذ الاوسط اربعة طساسيج طسّوج الجبّة والبداة، طسّوج سورا وبربيسما، طسّوج باروسما، طسّوج نهر الملك، ويقال انهما طسّوج واحد وان الطسّوج الرابع السّيبين والوقوف فنقل فى الضياع كورة استان بهقباذ الاسفل خمسة طساسيج طسّوج فرات بادقلى، طسّوج السّيلحين، طسّوج نستر، طسّوج روذمستان، طسّوج هرمزجرد، ويقال ان روذمستان وهرمزجرد ضياع متفرّقة من طساسيج عدّة
تقدير السواد
الجانب الغربىّ سقى الفرات ودجيل
طسّوج الأنبار (8) رساتيقه خمسة وبيادره مائتان وخمسون بيدرا الحنطة الفان وثلثمائة كرّ، الشعير الف واربع مائة كرّ، الورق مائة الف وخمسون الف درهم طسّوج قطربّل رساتيقه عشرة بيادره مائتان وعشرون بيدرا الحنطة الفا كرّ، الشعير الف كرّ، الورق ثلثمائة الف درهم 
طسّوج مسكن رساتيقه ستّة بيادره مائة وخمسون بيدار الحنطة ثلثة آلاف كرّ، الشعير الفا كرّ، الورق مائة الف وخمسون الفا طسّوج بادوريا رساتيقه اربعة عشر بيادره اربع مائة وعشرون بيدرا الحنطة ثلثة آلاف وخمس مائة كرّ، الشعير الفا كرّ، الورق الفا الف درهم طسّوج بهرسير رساتيقه عشرة بيادره مائتان واربعون بيدرا الحنطة الف وتسع مائة كرّ، الشعير الف وسبع مائة كرّ، الورق مائة الف وخمسون الف درهم طسّوج الرّومقان رساتيقه عشرة بيادره (9) مائتان واربعون بيدرا الحنطة ثلثة آلاف وثلثمائة كرّ، الشعير ثلثة آلاف وخمسون كرّا، الورق مائتا الف وخمسون الف درهم طسّوج كوثى رساتيقه تسعة بيادره مائتان وعشرة بيادر الحنطة ثلثة آلاف كرّ، الشعير الفا كرّ، الورق مائة الف وخمسون الف درهم طسّوج نهر درفيط رساتيقه ثمانية بيادره مائة وخمسة وعشرون بيدرا الحنطة الفا كرّ، الشعير الفا كرّ، الورق مائتا الف درهم طسّوج نهر جوبر رساتيقه عشرة بيادره مائتان وسبعة وعشرون بيدرا الحنطة الف وسبع مائة كرّ، الشعير ستّة الاف كرّ، الورق مائة الف وخمسون الف درهم كورة الزّوابى ثلثة طساسيج رساتيقها اثنا عشر رستاقا بيادرها 
مائتان واربعة واربعون بيدرا الحنطة الف واربع مائة كرّ، الشعير سبعة آلاف ومائتا كرّ، الورق مائتا الف وخمسون الف درهم طسّوجى بابل وخطرنية الرساتيق ستّة عشر البيادر ثلثمائة وثمانية وسبعون بيدرا الحنطة ثلثة آلاف كرّ، (10) الشعير خمسة آلاف كرّ، الورق ثلثمائة الف وخمسون الفا طسّوج الفلّوجة العليا رساتيقه خمسة عشر بيادره مائتان واربعون بيدرا الحنطة خمس مائة كرّ، الشعير خمس مائة كرّ، الورق سبعون الف درهم طسّوج الفلّوجة السفلى الرساتيق ستّة البيادر اثنان وسبعون بيدرا الحنطة خمس مائة كرّ، الشعير خمس مائة كرّ، الورق سبعون الف درهم طسّوج الفلّوجة السفلى الرساتيق ستّة البيادر اثنان وسبعون بيدرا الحنطة الفا كرّ، الشعير ثلثة آلاف كرّ، الورق مائتا الف وثمانون الف درهم طسّوج النّهرين الرساتيق ثلثة البيادر مائة واحد وثمانون بيدرا الحنطة ثلثمائة كرّ، الشعير اربع مائة كرّ، الورق خمسة واربعون الفا طسّوج عين التّمر الرساتيق ثلثة البيادر اربعة عشر بيدرا الحنطة ثلثمائة كرّ، الشعير اربع مائة كرّ، الورق خمسة واربعون الفا طسّوج الجبّة والبداة الرساتيق ثمانية البيادر احد وسبعون بيدرا الحنطة الف ومائتا كرّ، الشعير الف وستّمائة كرّ، الورق مائة الف وخمسون الف درهم طسّوج سورا وبربيسما الرساتيق عشرة البيادر مائتان وخمسة وستّون بيدرا الحنطة سبع مائة كرّ، (11) الشعير والارزّ الفان واربع مائة كرّ، الورق مائة الف درهم 
طسّوج باروسما ونهر الملك الرساتيق عشرة البيادر ستّمائة واربعة وستّون بيدرا الحنطة الف وخمس مائة كرّ، الشعير اربعة آلاف وخمس مائة كرّ، الورق مائتا الف وخمسون الفا السيبين والوقوف ضياع جمعت من عدّة طساسيج وصيّرت ضيعة واحدة فهى اعظم قدرا من طسّوجين وتقدير العشر منها من الحنطة خمس مائة كرّ، ومن الشعير خمسة آلاف وخمس مائة كرّ، ومن الورق مائة وخمسون الفا طسّوج فرات بادقلى رساتيقه ستّة عشر بيادره مائتان واحد وسبعون بيدرا الحنطة الفا كرّ، الشعير والارزّ الفان وخمس مائة كرّ، الورق تسع مائة الف درهم طسّوج السّيلحين وفيه الخورنق وطيزناباذ بيادره اربعة وثلثون بيدرا الحنطة الف كرّ، الشعير الف وسبع مائة كرّ، الورق مائة الف واربعون الفا طسّوجى روذمستان وهرمزجرد الحنطة خمس مائة كرّ، الشعير خمس مائة (12) كرّ، الورق عشرة آلاف درهم طسّوج نستر الرساتيق سبعة بيادره مائة وثلثة وسبعون بيدرا الحنطة الف ومائتان وخمسون كرّا، الشعير والارزّ الفا كرّ، الورق ثلثمائة الف درهم ايغار يقطين من عدّة طساسيج تقديره من الورق مائتا الف واربعة آلاف درهم وثمان مائة واربعون درهما بحقّ بيت المال سقى دجلة والفرات 
كورة كسكر وفيها نهر الصلة وبرقة والرّيّان كان يرتفع فيها من خراجها وسائر ابواب مالها سبعون الف الف درهم تقديرها من الحنطة ثلثة آلاف كرّ، ومن الشعير والارزّ عشرون الف كرّ، ومن الورق مائتا الف درهم
الجانب الشرقىّ
طسّوج بزرجسابور رساتيقه تسعة بيادره مائتان وثلثة وستّون بيدرا الحنطة الفان وخمس مائة كرّ، الشعير الفان ومائتا كرّ، الورق ثلثمائة الف درهم طسّوج الراذانين رساتيقه ستّة عشر (13) بيادره ثلثمائة واثنان وستّون بيدرا الحنطة اربعة آلاف وثمان مائة كرّ، الشعير اربعة آلاف وثمان مائة كرّ، الورق مائة الف وعشرون الفا طسّوج نهر بوق الحنطة مائتا كرّ، الشعير الف كرّ، الورق مائة الف درهم طسّوج كلواذى ونهر بين الرساتيق ثلثة البيادر اربعة وثلثون بيدرا الحنطة الف وستّمائة كرّ، الشعير الف وخمس مائة كرّ، الورق ثلثمائة الف وثلثون الف درهم طسّوجى جازر والمدينة العتيقة الرساتيق سبعة البيادر مائة وستّة عشر بيدرا الحنطة الف كرّ، الشعير الف وخمس مائة كرّ، الورق مائة الف واربعون الفا `
}

  // Convert a text into an array of forms for targets
  prepTargets() {
    // Put a zero-width space (ZWS) at the beginning of the first character
    // Put a ZWS at the end of the last character
    // If the character is not in this.alphabet, put a ZWS on both ends of it
    // If the letter is an alif, dal, dhal, ra, zayn, waw, or non-initial ta: put a zero-width space (ZWS) after it
    // If the letter is followed by something not in this.alphabet, put a ZWS after it
    // If the previous target ended in a ZWS, put a ZWS at the start of this target
    // If the previous target was not in this.alphabet, put a ZWS at the start of this target
    // If this target does not begin with a ZWS, start it with a zero-width joiner (ZWJ)
    // If this target does not end with a ZWS, end it with a zero-width joiner

    this.targets = [...this.text];

    // Process the first target in the text
    let prefix, suffix;
    let current = this.text[0];
    let next = this.text[1];
    // This is the first entry, so the prefix character must be zero-width space (ZWS)
    prefix = this.ZWS;
    if (!this.alphabet.includes(current) || !this.alphabet.includes(next)) {
      suffix = this.ZWS;
    } else if ([...'آأإادذرزو'].includes(current)) {
      suffix = this.ZWS;
    } else {
      suffix = this.ZWJ;
    }
    this.targets[0] = prefix + current + suffix;

    // Loop to process all but the last target
    for (let i=1; i<this.text.length-1; i++) {
      // Prefix is the same as suffix of previous character
      prefix = this.targets[i-1][2];
      current = this.text[i];
      next = this.text[i+1];
      if (!this.alphabet.includes(current) || !this.alphabet.includes(next)) {
        suffix = this.ZWS;
      } else if ([...'آأإادذرزو'].includes(current) || (current === 'ت' && prefix === this.ZWJ)) {
        suffix = this.ZWS;
      } else {
        suffix = this.ZWJ;
      }
      this.targets[i] = prefix + current + suffix;
    }

    // Process the last target
    prefix = this.targets[this.text.length-2][2];
    current = this.text[this.text.length-1];
    suffix = this.ZWS;
    this.targets[this.text.length-1] = prefix + current + suffix;
  }
}