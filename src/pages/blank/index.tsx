import React from 'react';
import { connect } from "react-redux";
import { } from './../../components';
import { } from './../../actions';

interface Props{
  actions: any; //typeof AnyActions 
}


class BlankPage extends React.Component<Props>{

  constructor(props: Props){ 
    super(props)
  }

  render(){
    return (
      <div></div>
    );
  }

}


const mapStateToProps = ({  }) => {
  return {  };
}
export default connect(mapStateToProps, {

})(BlankPage);
