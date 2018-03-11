// 货币格式化
const settings = {
    currency: {
			symbol : "￥",		// 货币符号
			format : "%s%v",	// 控制输出 %s = symbol, %v = value
			decimal : ".",		// 小数点分隔符
			thousand : ",",		// 千分位分隔符
			precision : 2,		// 精确度
			grouping : 3		// 位数分组
		},
		number: {
			precision : 2,		// 数字默认精确度 0
			grouping : 3,		// 位数分组
			thousand : ",",
			decimal : "."
		}
}
//对象合并
const  defaults = (object, defs) => {
		let key;
		object = object || {};
		defs = defs || {};
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}
// 检查并规范化精度值（必须为正整数）
const  checkPrecision = (val, base)=> {
	val = Math.round(Math.abs(val));
	return isNaN(val)? base : val;
}

const unformat =  (value, decimal) =>{
		value = value || 0;

		if (typeof value === "number") return value;

		decimal = decimal || settings.number.decimal;

		let regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
				.replace(/\((?=\d+)(.*)\)/, "-$1")
				.replace(regex, '')
				.replace(decimal, '.')
			);
		return !isNaN(unformatted) ? unformatted : 0;
	};
const toFixed = (value, precision) => {
	precision = checkPrecision(precision, settings.number.precision);
    let exponentialForm = Number(unformat(value) + 'e' + precision);
	let rounded = Math.round(exponentialForm);
	let finalResult = Number(rounded + 'e-' + precision).toFixed(precision);
	return finalResult;
};
const  checkCurrencyFormat = (format)=> {
		const  defaults = settings.currency.format;
		if ( !format || !format.pos || !format.pos.match("%v") ) {

			return   {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		return format;
	}
const  formatNumber  = (number, precision, thousand, decimal) => {
    number = unformat(number);
    let opts =defaults(
			 {
				precision : precision,
				thousand : thousand,
				decimal : decimal
			},
			settings.number
		);
	let usePrecision = checkPrecision(opts.precision),
		negative = number < 0 ? "-" : "",
		base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
		mod = base.length > 3 ? base.length % 3 : 0;

	// 格式化数字:
	return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
};


 const  formatMoney = (number, symbol, precision, thousand, decimal, format) => {
     number = unformat(number);
     let opts = defaults(
		    {
				symbol : symbol,
				precision : precision,
				thousand : thousand,
				decimal : decimal,
				format : format
			},
			settings.currency
		),
        formats = checkCurrencyFormat(opts.format),
		useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;
        let  a = useFormat.replace('%s', opts.symbol);
		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	};

export default formatMoney
