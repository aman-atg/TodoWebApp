import React, { Component } from "react";
import uuid from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
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
      id: uuid(),
      name: this.state.name
    };
    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div className="">
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Task
        </Button>
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
    item: state.item
  };
};

export default connect(mapStateToProps, { addItem })(ItemModal);
