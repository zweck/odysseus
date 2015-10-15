import Infrastructure from './Infrastructure';

export default class InfrastructureManager {

	constructor(infrastructures){
		this.infrastructures = infrastructures;
		this.infrastructureByName = {};

		this.infrastructures.forEach((infrastructure) => {
			this.infrastructure = infrastructure;
		});
	}

	set infrastructure(infrastructure){
		var infrastructure = new Infrastructure(infrastructure);
		this.infrastructureByName[infrastructure.name] = infrastructure;
	}
}