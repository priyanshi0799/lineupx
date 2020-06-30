import React, {Component} from 'react';
import './style.css';
class Table extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
        data : this.props?.data,
        expandedRows : []
    };
}

componentDidUpdate(prevprops, prevstate){
    if(prevprops.data!== this.props.data){
        if(this.props.data && this.props.data?.length){
            this.setState({
                data: this.props.data
            })
        }
    }
}

handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
    
    const newExpandedRows = isRowCurrentlyExpanded ? 
    currentExpandedRows.filter(id => id !== rowId) : 
    currentExpandedRows.concat(rowId);
    
    this.setState({expandedRows : newExpandedRows});
}

renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.complaint_no);
    const itemRows = [
  <tr onClick={clickCallback} key={"row-data-" + item.complaint_no}>
      <td>{item.complaint_no}</td>
      <td>{item.IssueRaiseOn}</td>
      <td>{item.issue}</td>
      <td>{item.status}</td>			
  </tr>
    ];
    
    if(this.state.expandedRows.includes(item.complaint_no)) {
        itemRows.push(
            <tr key={"row-expanded-" + item.complaint_no}>
                <td colSpan="4" style={{backgroundColor: "white"}}>
                    <b>Description : </b>{item.textfield}<br />
                    <b>Image URL: </b>{item.complaint_img_url}</td>
            </tr>
        );
    }
    
    return itemRows;    
}

render() {
    let allItemRows = [];

    if(this.state.data){
      this.state.data.forEach(item => {
        const perItemRows = this.renderItem(item);
        allItemRows = allItemRows.concat(perItemRows);
    });
    }
    
    
    
    return (
       <table>
           
               {
                   this.props.heading.map((data)=>(
                   <th>{data}</th>
                   ))
               }
           
        <tbody>{allItemRows}</tbody>
       </table>
    );
}
}

export default Table;