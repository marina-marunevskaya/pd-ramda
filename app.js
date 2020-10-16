// Thinking in Ramda: Getting Started
(() => {
	class User {
		constructor(fullName, position, monthlyIncome) {
			this.fullName = fullName;
			this.position = position;
			this.monthlyIncome = monthlyIncome;
		}

		getFullName() {
			return this.fullName;
		}

		getPosition() {
			return this.position;
		}

		getMonthlyIncome() {
			return this.monthlyIncome;
		}

		printInfo() {
			console.log(`${this.fullName}, ${this.position}`);
			console.log('---');
		}
	}

	const users = [
		new User('Jackie Smith', 'Frontend Developer', 1200),
		new User('Mike Johnson', 'Project Manager', 1500),
		new User('Helen Wolfgang', 'PHP Backend Developer', 900),
		new User('Kate Swan', 'Designer', 2400),
		new User('Jack Cat', 'Business Analyst', 2500),
		new User('Jean Miles', 'React Frontend Developer', 800)
	];

	console.log('Thinking in Ramda: Getting Started');

	const printInfo = user => user.printInfo();

	console.log('USERS');

	// forEach
	R.forEach(
		printInfo,
		users
	);

	// map
	const userFullNames = R.map(
		user => user.getFullName(),
		users
	);

	console.log('USER FULL NAMES');
	console.log(userFullNames);

	const isDeveloper = user => user.getPosition().indexOf('Developer') !== -1;

	// filter
	const developers = R.filter(
		isDeveloper,
		users
	);

	console.log('DEVELOPERS');

	R.forEach(
		printInfo,
		developers
	);

	// reject
	const notDevelopers = R.reject(
		isDeveloper,
		users
	);

	console.log('NOT DEVELOPERS');

	R.forEach(
		printInfo,
		notDevelopers
	);

	// find
	const firstDeveloper = R.find(
		isDeveloper,
		users
	);

	if (firstDeveloper) {
		console.log('FIRST DEVELOPER');
		printInfo(firstDeveloper);
	}

	const add = (accumulator, user) => accumulator + user.getMonthlyIncome();

	// reduce
	const totalMonthlyIncome = R.reduce(
		add,
		0,
		users
	);

	console.log('TOTAL MONTHLY INCOME');
	console.log(totalMonthlyIncome);
})();
