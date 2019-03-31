import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import {
  Table,
  FormGroup,
  Input
} from 'reactstrap';

class CustomTable extends Component {

  onPageChanged = ({ selected }) => {
    this.scrollToTableHeader();
    this.props.onPageChanged(selected + 1);
  }

  onRowsPerPageChange = (e) => {
    if (e) e.preventDefault();

    this.scrollToTableHeader();
    this.props.onPerPageChanged(parseInt(e.target.value));
  }

  scrollToTableHeader = () => {
    const { tableId } = this.props;

    if (tableId) {
      const element = document.getElementById(tableId);
      const topPos = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo( 0, Math.abs(topPos) );
    }

    return
  }

  render() {
    const {
      title,
      head,
      rows,
      perPage,
      page,
      totalPages,
      hover,
      wrapperClass,
      tableId
    } = this.props;


    return (
      <div className={`${wrapperClass} table-wrapper`} id={tableId}>
        <Table striped responsive className="bg-white mb-0" hover={hover}>
          <thead>
            <tr className="bg-light">
              {head.map((e, key) =>
                <th key={key}>
                  {e}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>

        </Table>
        {
          totalPages > 1 &&
          (
            <div className="table-footer d-flex justify-content-between mobile_flex-column-reverse flex-wrap p-3">
              <FormGroup className="d-flex align-items-center">
                Show
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  className="mx-2"
                  value={perPage}
                  onChange={this.onRowsPerPageChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </Input>
                Customers
              </FormGroup>
              <ReactPaginate
                forcePage={page - 1}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"page-link mobile_mb-2"}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                disableInitialCallback={true}
                pageRangeDisplayed={4}
                onPageChange={this.onPageChanged}
                containerClassName={"pagination mobile_flex-row-wrap mobile_flex-content-center"}
                pageClassName={"page-item mobile_mb-2"}
                pageLinkClassName={"page-link"}
                activeClassName={"active"}
                previousClassName={"page-item mobile_order-1 mobile_w-50 mobile_mb-2"}
                nextClassName={"page-item mobile_order-1 mobile_w-50 mobile_mb-2"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"disabled"}
                 />
            </div>
          )
        }
      </div>
    )
  }
}

export default CustomTable;