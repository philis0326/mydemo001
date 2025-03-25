document.addEventListener('DOMContentLoaded', () => {

    let userData = {};
	if('currentUserData' in localStorage){
		userData = JSON.parse(localStorage.getItem('currentUserData'));
	}else{
		userData = {
			lastWeekScore: 117,      // 上周得分
			currentBalance: 80,    // 当前余额
			activities: {
				addCash: 30,
				referrals: 15,
				p2p: 17,
				crossBorder: 0,
				miniApps: 35,
				billPayments: 60
			}
		};
	}

    // 等级配置
    const LEVELS = [
        { name: 'Starter', min: 0},
        { name: 'Mover', min: 51},
        { name: 'Shaker', min: 151},
        { name: 'Master', min: 301}
    ];

    // 活动配置
    const ACTIVITIES = [
		{ 
			id: 'addCash',
			label: 'Add cash',
			desc: '+10 points each time the user deposits',
			max: 30,
			getCurrent: () => userData.activities.addCash
		},
		{
			id: 'referrals',
			label: 'Referrals',
			desc: '+5 points for each valid referral',
			max: 30,
			getCurrent: () => userData.activities.referrals
		},
		{
			id: 'balance',
			label: 'Hold Higher balance',
			desc: 'Tiered points based on balance',
			max: 100,
			getCurrent: () => {
				const balance = userData.currentBalance;
				if (balance >= 500) return 100;
				if (balance >= 100) return 50;
				if (balance >= 50) return 20;
				if (balance >= 10) return 10;
				return 0;
			}
		},
		{
			id: 'p2p',
			label: 'P2P transactions',
			desc: '+3 pts per action',
			max: 20,
			getCurrent: () => userData.activities.p2p
		},
		{
			id: 'crossBorder',
			label: 'Cross-border Sends',
			desc: '+25 pts per action',
			max: 50,
			getCurrent: () => userData.activities.crossBorder
		},
		{
			id: 'miniApps',
			label: 'Mini App Usage',
			desc: '+10 pts per action',
			max: 70,
			getCurrent: () => userData.activities.miniApps
		},
		{
			id: 'billPayments',
			label: 'Bill Payments',
			desc: '+20 pts per action',
			max: 100,
			getCurrent: () => userData.activities.billPayments
		},
	];
	
	init();
	
    // 初始化页面
    function init() {
        // 上周数据
        document.getElementById('lastWeekScore').textContent = userData.lastWeekScore;
        updateLevelDisplay(userData.lastWeekScore, true);

        // 本周数据
        const currentScore = calculateCurrentScore();
        updateLevelDisplay(currentScore);
        updateProgress(currentScore);
        
        // 初始化活动列表
        initActivities();
    }

    // 计算当前得分（含余额计算）
    function calculateCurrentScore() {
        let score = 0;
		// 计算其他活动得分（使用真实数据）
		score += userData.activities.addCash;
		score += userData.activities.referrals;
		score += userData.activities.p2p;
		score += userData.activities.crossBorder;
		score += userData.activities.miniApps;
		score += userData.activities.billPayments;

		// 计算真实余额得分
		const realBalance = userData.currentBalance;
		if (realBalance >= 500) score += 100;
		else if (realBalance >= 100) score += 50;
		else if (realBalance >= 50) score += 20;
		else if (realBalance >= 10) score += 10;

		return score;
    }

    // 更新等级显示
    function updateLevelDisplay(score, isLastWeek = false) {
		let currentLevel;
		for (let i = LEVELS.length - 1; i >= 0; i--) {
			if (score >= LEVELS[i].min) {
				currentLevel = LEVELS[i];
				break;
			}
		}
    
		const suffix = isLastWeek ? 'current' : 'next';		
		document.getElementById(suffix+'Level').textContent = currentLevel.name;		
	}

    // 更新进度条
    function updateProgress(score) {
		let nextLevel = LEVELS.find(l => l.min > score);
		if (!nextLevel) {
			document.getElementById('nextLevelInfo').textContent = '已达最高等级';
			document.querySelector('#currentProgress').style.width = '100%';
			return;
		}

		const currentLevel = LEVELS.find(l => l.min <= score && (LEVELS[LEVELS.indexOf(l)+1]?.min > score || !LEVELS[LEVELS.indexOf(l)+1]));
		const progress = (score - currentLevel.min) / (nextLevel.min - currentLevel.min) * 100;
		document.querySelector('#currentProgress').style.width = `${progress}%`;
		document.getElementById('nextLevelInfo').textContent = 
			`Next rank in: ${nextLevel.min - score} pts`;
	}    

    // 初始化活动列表
    function initActivities() {
		const container = document.getElementById('activitiesList');
		container.innerHTML = '';

		ACTIVITIES.forEach(activity => {
		// 使用真实用户数据初始化
			const current = activity.getCurrent();
			const max = activity.max;
			const isFull = current >= max;
			const progress = Math.min((current / max) * 100, 100);

			const activityItem = document.createElement('div');
			activityItem.className ='activity-item';
			activityItem.innerHTML = `
			<h3>${activity.label}</h3>
			<p>${activity.desc} (Max: ${max} points)</p>
			<div class="progress-bar">
				<div class="progress-fill ${isFull ? 'full' : ''}" style="width: ${progress}%"></div>
			</div>
			<p>Current pts: ${current} ${isFull ? '<span class="max-tag">Reached Max</span>' : ''}</p>
			`;
			container.appendChild(activityItem);
		});
	}	

    // 返回顶部功能
    window.onscroll = function() {
        document.querySelector('.back-to-top').style.display = 
            (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? 'flex' : 'none';
    };

    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }        
});