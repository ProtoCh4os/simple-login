import React from "react";
import Link from "next/link";
import { Grid, Button } from "@material-ui/core";
import Layout from "../components/layout";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        pass: "",
        email: "",
        phone: "",
      },
      submitting: false,
      nameExists: [],
    };
    this.changeState = this.changeState.bind(this);
    this.auth = this.auth.bind(this);

    this.bStyle = {
      margin: "10px 20px",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule(
      "nameExists",
      (val) => !this.state.nameExists.includes(val)
    );
  }

  changeState(e) {
    this.state.form[e.target.id] = e.target.value.trim();
    this.setState(this.state);
  }

  auth(e) {
    e.preventDefault();

    this.state.submitting = false;
    this.setState(this.state);
    this.forceUpdate();

    var form = this.state.form;

    axios
      .post("http://localhost:3000/signup", form)
      .then((response) => {
        Cookies.set("JWT_TOKEN", response.data.payload.token);
        Router.push(response.data.success ? "/client" : "/login");
      })
      .catch((err) => {
        if (err.response.status == 409) {
          const name = this.state.form.name;

          this.state.nameExists.push(name);
          this.state.form.name = "";
          this.setState(this.state);

          this.state.form.name = name;
          this.setState(this.state);
        }
      })
      .then(() => this.forceUpdate());
  }

  render() {
    return (
      <Layout>
        <ValidatorForm ref="form" onSubmit={this.auth}>
          <h1>Cadastro</h1>
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
              validators={["required", "nameExists"]}
              errorMessages={[
                "this field is required",
                "username already exists",
              ]}
              label="Usuário"
            ></TextValidator>
            <TextValidator
              type="password"
              onChange={this.changeState}
              id="pass"
              name="pass"
              value={this.state.form.pass}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="Senha"
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
              type="email"
              onChange={this.changeState}
              id="email"
              name="email"
              value={this.state.form.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "Email is not valid"]}
              label="E-mail"
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
            <Link href="/login">
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

export default Signup;
