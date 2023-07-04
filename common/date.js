function shiftTimeStamp(time) {
	// time /= 1000; 如果传进来的是 毫秒 形式，则在这里除1000将其转为 秒 形式
	function f_m_dispose(min, sec) { // 分秒处理函数
		if (min < 10 && sec < 10) {
			return "0" + min + ":" + "0" + sec; // 如果分和秒都小于10，则前面都加入0
		} else if (min < 10 && sec >= 10) {
			return "0" + min + ":" + sec; // 如果分小于10，秒大于10，则给分前面加0
		} else if (min >= 10 && sec < 10) {
			return min + ":" + "0" + sec; // 如果分大于10，秒小于10，则给秒前面加0
		} else {
			return min + ":" + sec; // 如果分秒都大于10，则直接return 
		}
	}
	let hour = Number.parseInt(time / 3600); // 获取总的小时
	let min = Number.parseInt((time - hour * 3600) / 60); // 获取总分钟
	let sec = time - (hour * 3600) - (min * 60); // 减去总 分 后剩余的分秒数
	if (!hour) { // 小时为0时
		return f_m_dispose(min, sec);
	} else { // 小时大于0的处理
		if (!min) { // 分为0时
			// 如果秒也小于10，则返回 例1:00:07
			return sec < 10 ? hour + ":" + "00" + ":0" + sec : hour + ":" + "00" + ":" + sec;
		} else { // 有分钟时的处理
			return hour + ":" + f_m_dispose(min, sec); // 返回总小时加上处理好的分秒数
		}
	}
}

function getCurrentDate(time) {
	let date = new Date(time);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	month = (month > 9) ? month : ("0" + month);
	day = (day < 10) ? ("0" + day) : day;
	let today = year + "-" + month + "-" + day;

	return today
}

function getWeekDate() {
	const one_day = 86400000; // 24 * 60 * 60 * 1000;
	const date = new Date();
	const day = date.getDay(); // 返回0-6,0表示周日
	// 设置时间为当天的0点
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	const week_start_time = date.getTime() - (day - 1) * one_day;
	const week_end_time = date.getTime() + (7 - day) * one_day;
	return {
		start: getCurrentDate(week_start_time),
		end: getCurrentDate(week_end_time)
	}

	// return {
	// 	week_start_time,
	// 	week_end_time
	// }
}

function getMonthDate() {
	const currentDate = new Date(); // Get current date
	const currentYear = currentDate.getFullYear(); // Get current year
	const currentMonth = currentDate.getMonth(); // Get current month

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // First day of the month
	const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // Last day of the month

	const totalDays = lastDayOfMonth.getDate(); // Get number of days in the current month
	
	return {
		start: getCurrentDate(new Date(currentYear, currentMonth, 1).getTime()),
		end: getCurrentDate(new Date(currentYear, currentMonth, totalDays).getTime())
		
	}
}




export default {
	shiftTimeStamp,
	getCurrentDate,
	getWeekDate,
	getMonthDate
	
}