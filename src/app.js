App = {
	loading: false,
	contracts: {},

	load: async () => {
		await App.loadWeb3()
		await App.loadAccount()
		await App.loadContract()
		await App.render()
	},

	// https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
	loadWeb3: async () => {
		console.log('loadWeb3')
		if (typeof web3 !== 'undefined') {
			console.log('1')
			App.web3Provider = web3.currentProvider
			web3 = new Web3(web3.currentProvider)
		} else {
			console.log('2')
			window.alert("Please connect to Metamask.")
		}
		// Modern dapp browsers...
		if (window.ethereum) {
			console.log('3')
			window.web3 = new Web3(ethereum)
			try {
				console.log('4 Request account access if needed')
				// Request account access if needed
				await ethereum.enable()
				// Acccounts now exposed`
				web3.eth.sendTransaction({/* ... */})
			} catch (error) {
				console.log('5 User denied account access...')
				// User denied account access...
			}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			console.log('6')
			App.web3Provider = web3.currentProvider
			window.web3 = new Web3(web3.currentProvider)
			// Acccounts always exposed
			web3.eth.sendTransaction({/* ... */})
		}
		// Non-dapp browsers...
		else {
			console.log('7')
			console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	},

	loadAccount: async () => {
		// Set the current blockchain account
    const accounts = await web3.eth.getAccounts();
    App.account = accounts[0];
    console.log("Current account:", App.account);
	},

	// loadContract: async () => {
	// 	// Create a JavaScript version of the smart contract
	// 	const todoList = await $.getJSON('TodoList.json');
	// 	App.contracts.TodoList = artifacts.require('TodoList');
	// 	App.contracts.TodoList.setProvider(App.web3Provider)
	// 	console.log('todoList', todoList);
	// },

	loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const todoList = await $.getJSON('TodoList.json');
    const web3Provider = App.web3Provider;

    // Get ABI from todoList
    const contractABI = todoList.abi;
    const contractAddress = todoList.networks[5777].address;

    // Create contract instance
    App.contracts.TodoList = new web3.eth.Contract(contractABI, contractAddress);

    console.log('todoList', todoList);
	},

	render: async () => {
		// Prevent double render
		if (App.loading) {
			return
		}

		// Update app loading state
		App.setLoading(true)

		// Render Account
		$('#account').html(App.account)

		// Update loading state
		App.setLoading(false)
	},

	renderTasks: async () => {
		// Load the total task count from the blockchain

		// Render out each task with a new task template

		// Show the task
	},

	setLoading: (boolean) => {
		App.loading = boolean
		const loader = $('#loader')
		const content = $('#content')
		if (boolean) {
			loader.show()
			content.hide()
		} else {
			loader.hide()
			content.show()
		}
	}

}

$(() => {
	$(window).load(() => {
		App.load()
	})
})