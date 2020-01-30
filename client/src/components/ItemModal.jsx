import React, { Component } from "react";
import {
  Button,
  Modal,
  //  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div className="">
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Task
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please Log In to your account.</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {/*<ModalHeader toggle={this.toggle}></ModalHeader>*/}
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Task</Label>
                <Input
                  type="text"
                  name="name"
                  id="Task"
                  placeholder="Trip to Moon"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={{ marginTop: "2em" }} block>
                  Add Task
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { addItem })(ItemModal);
