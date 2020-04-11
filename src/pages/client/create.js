import React from "react";
import Link from "next/link";
import { Grid, Button } from "@material-ui/core";
import Layout from "../../components/layout";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        doc: "",
        address: "",
        phone: "",
      },
      submitting: false,
    };
    this.changeState = this.changeState.bind(this);
    this.register = this.register.bind(this);

    this.bStyle = {
      margin: "10px 20px",
    };
  }

  changeState(e) {
    this.state.form[e.target.id] = e.target.value;
    this.setState(this.state);
  }

  register(e) {
    e.preventDefault();

    this.state.submitting = false;
    this.setState(this.state);
    this.forceUpdate();

    var form = this.state.form;
    Object.keys(form).forEach((field) => (form[field] = form[field].trim()));

    axios
      .post("http://localhost:3000/client/create", form, {
        headers: {
          "x-access-token": Cookies.get("JWT_TOKEN"),
        },
      })
      .then((response) => {
        Router.push(response.data.success ? "/client" : "/login");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          Router.replace("/login", "/");
        }
      })
      .then(() => this.forceUpdate());
  }

  render() {
    return (
      <Layout>
        <ValidatorForm ref="form" onSubmit={this.register}>
          <h1>Novo Cliente</h1>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <TextValidator
              onChange={this.changeState}
              id="name"
              name="name"
              value={this.state.form.name}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="Nome"
            ></TextValidator>
            <TextValidator
              onChange={this.changeState}
              id="doc"
              name="doc"
              value={this.state.form.doc}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="CPF"
            ></TextValidator>
          </Grid>
          <br></br>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <TextValidator
              onChange={this.changeState}
              id="address"
              name="address"
              value={this.state.form.address}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="Endereço"
            ></TextValidator>
            <TextValidator
              onChange={this.changeState}
              validators={["required"]}
              /* TODO: Add phone validation. RegEx wasn't working */
              errorMessages={["this field is required"]}
              id="phone"
              name="phone"
              value={this.state.form.phone}
              label="Telefone"
            ></TextValidator>
          </Grid>

          <Grid container direction="row" justify="space-around">
            <Link href="/client">
              <Button style={this.bStyle} variant="contained" color="default">
                Voltar
              </Button>
            </Link>
            <Button
              type="submit"
              style={this.bStyle}
              disabled={this.state.submitting}
              variant="contained"
              color="primary"
            >
              Salvar
            </Button>
          </Grid>
        </ValidatorForm>
      </Layout>
    );
  }
}

export default Create;
