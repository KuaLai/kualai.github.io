function KuaCounter(setting) {
    console.log(setting);
    this.userSetting = $.extend(this.userSetting, setting);
    console.log("----------")
    console.log(setting);
    console.log("----------")
    this.init();
}

KuaCounter.prototype.userSetting = {
    countHourEle: null,
    countMinEle: null,
    countSecEle: null,
    countMillSec: null,
    targetDateTime: new Date("2016-08-31 23:00:00")
};

KuaCounter.prototype.arguments = {
    targetDateTime_millSec: 0,
    argumentValidateSuccess: true

}

KuaCounter.prototype.init = function () {
    var thisClass = this;
    thisClass.arguments.targetDateTime_millSec = thisClass.userSetting.targetDateTime.getTime();
}

KuaCounter.prototype.start = function () {
    var thisClass = this;

    if (!thisClass.arguments.argumentValidateSuccess) {
        console.error("argument validate error");
        return;
    }

    setInterval(function () {
        var currentDateTime = new Date();
        var totalCountTime = thisClass.arguments.targetDateTime_millSec - currentDateTime.getTime();

        var hr_int = 0,
            min_int = 0,
            sec_int = 0,
            sec_int = 0,
            millSec_int = 0;


        if (totalCountTime > 0) {
            var lessTime = 0;
            hr_int = Math.floor(totalCountTime / (1000 * 60 * 60));
            lessTime = totalCountTime - (hr_int * 1000 * 60 * 60);
            min_int = Math.floor(lessTime / (1000 * 60));
            lessTime = lessTime - (min_int * 1000 * 60);
            sec_int = Math.floor(lessTime / (1000));
            lessTime = lessTime - (sec_int * 1000);
            millSec_int = lessTime;

        } 

        thisClass.userSetting.countHourEle.text(hr_int >= 0 ? hr_int : 0);
        thisClass.userSetting.countMinEle.text(min_int >= 0 ? min_int : 0);
        thisClass.userSetting.countSecEle.text(sec_int >= 0 ? sec_int : 0);
        thisClass.userSetting.countMillSec.text(millSec_int >= 0 ? millSec_int : 0);

    }, 1);
}