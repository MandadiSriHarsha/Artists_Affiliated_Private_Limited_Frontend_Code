import {Component} from 'react'
import './index.css'

class HomePage extends Component {
  state = {transactionsList: []}

  componentDidMount() {
    const fetchedList = JSON.parse(localStorage.getItem('transactionsList'))
    if (fetchedList === undefined || fetchedList === null) {
      this.setState({transactionsList: []})
    } else {
      this.setState({transactionsList: [...fetchedList]})
    }
  }

  changeRoute = () => {
    const {history} = this.props
    history.replace('/add-transaction')
  }

  render() {
    const {transactionsList} = this.state
    const sortedTransactionsList = transactionsList
      .sort((a, b) => a.date - b.date)
      .reverse()
    return (
      <div className="home-page-bg-container">
        <h1 className="page-heading">Office Income Manager</h1>
        <div className="manager-list-bg-container">
          <div className="manager-list-header">
            <p className="date-heading">Office Transactions</p>
            <p className="description-heading">Description</p>
            <p className="type-heading">Credit</p>
            <p className="type-heading">Debit</p>
            <p className="balance-heading">Balance</p>
          </div>
          {sortedTransactionsList.map(eachitem => (
            <div className="transaction-item">
              <p className="transaction-item-date">
                {new Date(eachitem.date).toLocaleDateString()}
              </p>
              <p className="transaction-item-description">
                {eachitem.description}
              </p>
              {eachitem.transactionType === 'credit' ? (
                <p className="transaction-item-type credit-text">
                  {eachitem.amount}
                </p>
              ) : (
                <p className="transaction-item-type empty-transaction">0</p>
              )}
              {eachitem.transactionType === 'debit' ? (
                <p className="transaction-item-type debit-text">
                  {eachitem.amount}
                </p>
              ) : (
                <p className="transaction-item-type empty-transaction">0</p>
              )}
              <p className="transaction-item-balance">{eachitem.balance}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="add-transaction-button"
          onClick={this.changeRoute}
        >
          + Add Transaction
        </button>
      </div>
    )
  }
}

export default HomePage
