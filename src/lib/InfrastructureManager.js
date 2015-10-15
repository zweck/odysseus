import Infrastructure from './Infrastructure';

/**
 * @class
 */
class InfrastructureManager {

	constructor(infrastructures){
		this.infrastructures = infrastructures;
		this.infrastructureByName = {};

		this.infrastructures.forEach((infrastructure) => {
			this.infrastructure = infrastructure;
		});
	}

	set infrastructure(infrastructure){
		infrastructure = new Infrastructure(infrastructure);
		this.infrastructureByName[infrastructure.name] = infrastructure;
	}
}

export default InfrastructureManager;