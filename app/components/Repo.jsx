import React ,{Component} from  'react';

class Repo extends Component{
	constructor(props) {
        super(props);
    }
	render() {
		return <div>tttttttt{this.props.params.username}</div>;
	}
}

export default Repo;