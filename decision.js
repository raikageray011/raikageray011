export class Action {
    /**
     * Holds a specific action for a player during a turn. Below is an outline of all possible actions,
     * the ids of those actions, and what data should hold in that instance:
     * 
     * id 0: Moves the player one square
     * data: String containing 'u', 'd', 'l', or 'r'
     * 
     * id 1: Attacks an opposing player
     * data: String containing the uuid of the player being attacked
     * 
     * id 2: Gift energy to another player
     * data: String containing the uuid of the player being gifted to
     * 
     * id 3: Upgrades range
     * data: null
     * 
     * id 4: Votes to give energy
     * data: String containing the uuid of the player being gifted to
     * @param {number} id 
     * @param {*} data 
     */
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    /**
     * Creates a new Action from a dictionary
     * @param {Object} dict The dictionary to use
     * @returns The new action created from the dictionary
     */
    fromDict(dict) {
        return new Action(dict["id"], dict["data"]);
    }

    /**
     * @returns {String} A dictionary representing this object
     */
    toDict() {
        var dict = {};
        dict["id"] = this.id;
        dict["data"] = this.data;
        return dict;
    }
}

export class Decision {
    /**
     * Holds a players decision for a given turn
     * @param {String} uuid Holds the ID of the player to whom the actions belong
     * @param {Array<Action>} actions An ordered list of selected actions for the player
     */
    constructor(uuid, actions) {
        this.uuid = uuid;
        this.actions = actions;
    }

    /**
     * Creates a new Decision from a dictionary
     * @param {Object} dict The dictionary representation of a Decision
     * @returns A new Decision from the dictionary
     */
    fromDict(dict) {
        var act = [];
        dict["actions"].forEach(action =>{
            act.push(Action.fromDict(action));
        });
        return new Decision(dict["uuid"], act);
    }

    /**
     * @returns A dictionary representing this object
     */
    toDict() {
        var dict = {};
        var act = [];
        this.actions.forEach(action => {
            act.push(action.toDict());
        });
        dict["uuid"] = this.uuid;
        dict["actions"] = act;
        return dict;
    }
}

export class Turn {
    /**
     * Holds a set of all player decisions for a turn
     * @param {Array<Decision>} decisions A list of decisions for the turn
     */
    constructor(decisions) {
        var dict = {}
        decisions.forEach(decision => {
            dict[decision.uuid] = decision;
        });
        this.decisions = dict;
    }
}