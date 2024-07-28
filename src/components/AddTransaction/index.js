import {Component} from 'react'

import './index.css'

class AddTransaction extends Component {
  state = {
    transactionType: 'credit',
    amount: '',
    description: '',
    amountError: false,
    descriptionError: false,
  }

  onChangeTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  getBalance = parsedList => {
    let balance = 0
    const {transactionType, amount} = this.state
    parsedList.forEach(eachitem => {
      if (eachitem.transactionType === 'credit') {
        balance += eachitem.amount
      } else {
        balance -= eachitem.amount
      }
    })
    if (transactionType === 'credit') {
      balance += amount
    } else {
      balance -= amount
    }
    return balance
  }

  onSaveTransaction = event => {
    event.preventDefault()
    const {amount, description, transactionType} = this.state
    if (typeof amount === 'number' && amount > 0) {
      if (typeof description === 'string' && description.length > 1) {
        const date = new Date()
        let parsedList = JSON.parse(localStorage.getItem('transactionsList'))
        if (parsedList === undefined || parsedList === null) {
          parsedList = []
        }
        const balance = this.getBalance(parsedList)
        const transactionItem = {
          date,
          description,
          transactionType,
          amount,
          balance,
        }
        const updatedList = [...parsedList, transactionItem]
        localStorage.setItem('transactionsList', JSON.stringify(updatedList))
        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({descriptionError: true})
      }
    } else {
      this.setState({amountError: true})
    }
  }

  onCancelTransaction = () => {
    this.setState({
      amount: 0,
      description: '',
      transactionType: 'credit',
      amountError: false,
      descriptionError: false,
    })
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {
      amount,
      transactionType,
      description,
      amountError,
      descriptionError,
    } = this.state
    return (
      <form className="add-transaction-form" onSubmit={this.onSaveTransaction}>
        <h1 className="form-heading">New Transaction</h1>
        <div className="input-container">
          <label className="label" htmlFor="transactionTypeInput">
            Transaction Type
          </label>
          <select
            onChange={this.onChangeTransactionType}
            value={transactionType}
            id="transactionTypeInput"
            className="select-input"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="amountInput">
            Amount
          </label>
          <input
            type="text"
            id="amountInput"
            value={amount}
            className="input"
            onChange={this.onChangeAmount}
          />
        </div>
        {amountError && <p className="error-text">*Invalid amount value</p>}
        <div className="input-container">
          <label className="label" htmlFor="descriptionInput">
            Description
          </label>
          <input
            type="text"
            className="input"
            id="descriptionInput"
            value={description}
            onChange={this.onChangeDescription}
          />
        </div>
        {descriptionError && (
          <p className="error-text">*Invalid description value</p>
        )}
        <div className="form-buttons-container">
          <button className="form-button save-button" type="submit">
            Save
          </button>
          <button
            className="form-button cancel-button"
            type="button"
            onClick={this.onCancelTransaction}
          >
            cancel
          </button>
        </div>
      </form>
    )
  }
}

export default AddTransaction
