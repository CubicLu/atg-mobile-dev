import React from 'react';
import { connect } from "react-redux";
import { } from './../../components';
import { } from './../../actions';

interface Props{
}


class BlankComponent extends React.Component<Props>{

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

})(BlankComponent);
