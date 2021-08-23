import React, {useState} from "react";
import {CART_ITEM_UPDATE,REMOVE_FROM_CART}  from '../../actions/cart'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Row, Form, FormGroup, Button , Label, Input  } from "reactstrap";
import {connect} from "react-redux";

const Cart = (props) => {
    const [updateCart,setUpdateCart] = useState({});

    const onChangeDate = (id,date,type) => {
        if(!updateCart[id]) {
            updateCart[id] = {}
        }
        updateCart[id] = {...updateCart[id],[type]:date}
        setUpdateCart(updateCart);
    }

    const onChangePackage = (id,e) => {
        let valuePack = e.target.value;

        if(!updateCart[id]) {
            updateCart[id] = {}
        }

        updateCart[id] = {...updateCart[id],valuePack}
        setUpdateCart(updateCart);
    }

    const onSubmitEdit = (id) => {
        let updateItem = updateCart[id]
        props.dispatch({type:CART_ITEM_UPDATE,data:updateItem});
    }

    const onRemoveItem = (id) => {
        props.dispatch({type:REMOVE_FROM_CART,id});
    }

    const FORMAT = 'MM/dd/yyyy';
    const items = props.items.map( (
        {valuePack,dateFrom,dateTo,id}
        ,index) => {
        return (
            <FormGroup key={index} inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="cart-package" className="mr-sm-2">Package</Label>
                    <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={ e =>onChangePackage(id,e)}
                    value={valuePack}>
                        <option>Basic</option>
                        <option>Premium</option>
                        <option>Deluxe</option>
                    </Input>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label className="mr-sm-2">From</Label>
                    <DayPickerInput
                        format={FORMAT}
                        value={dateFrom}
                        onDayChange={(e)=>onChangeDate(id,e,'dateFrom')}
                    />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label className="mr-sm-2">To</Label>
                    <DayPickerInput
                        format={FORMAT}
                        value={dateTo}
                        onDayChange={(e)=>onChangeDate(id,e,'dateTo')}
                    />
                </FormGroup>
                <Button
                onClick={()=>onSubmitEdit(id)}
                >Edit</Button>
                <Button
                onClick={()=>onRemoveItem(id)}
                >X</Button>  
            </FormGroup>
        )
    })

    if(props.items.length === 0) {
        return (
        <div>
            <h1>Cart is empty!</h1>
        </div>
        )
    }

    return (
        <Row>
            <Form>
                {items}
            </Form>
        </Row>
    )
}

const mapStateToProps =(state) => {
    return {...state.cart};
};
  
export default connect( mapStateToProps )(Cart);