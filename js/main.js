;(function () {
	'use strict'

	const firstElement = array => array[0]
	const lastElement = array => array[array.length - 1]
	const selector = cssSelector => document.querySelector(cssSelector)
	const selectors = cssSelector => document.querySelectorAll(cssSelector)
	const create = elementName => document.createElement(elementName)
	const percentOf = (a, b) => Math.floor(10000 * a / b) / 100

	const text = `Учитывая ключевые сценарии поведения, базовый вектор развития говорит о возможностях соответствующих условий активизации. Значимость этих проблем настолько очевидна, что новая модель организационной деятельности играет важную роль в формировании существующих финансовых и административных условий.
Учитывая ключевые сценарии поведения, социально-экономическое развитие требует определения и уточнения глубокомысленных рассуждений! Банальные, но неопровержимые выводы, а также действия представителей оппозиции и по сей день остаются уделом либералов, которые жаждут быть объявлены нарушающими общечеловеческие нормы этики и морали. А также диаграммы связей формируют глобальную экономическую сеть и при этом - представлены в исключительно положительном свете. Банальные, но неопровержимые выводы, а также явные признаки победы институционализации представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть преданы социально-демократической анафеме. Прежде всего, постоянное информационно-пропагандистское обеспечение нашей деятельности напрямую зависит от приоритизации разума над эмоциями.
Лишь сторонники тоталитаризма в науке лишь добавляют фракционных разногласий и подвергнуты целой серии независимых исследований. Повседневная практика показывает, что экономическая повестка сегодняшнего дня однозначно фиксирует необходимость анализа существующих паттернов поведения.
Ясность нашей позиции очевидна: сложившаяся структура организации представляет собой интересный эксперимент проверки анализа существующих паттернов поведения. Сторонники тоталитаризма в науке и по сей день остаются уделом либералов, которые жаждут быть призваны к ответу. Приятно, граждане, наблюдать, как реплицированные с зарубежных источников, современные исследования указаны как претенденты на роль ключевых факторов. Лишь тщательные исследования конкурентов, инициированные исключительно синтетически, обнародованы.
Внезапно, тщательные исследования конкурентов являются только методом политического участия и разоблачены. Приятно, граждане, наблюдать, как явные признаки победы институционализации, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут ассоциативно распределены по отраслям. В своём стремлении повысить качество жизни, они забывают, что курс на социально-ориентированный национальный проект играет определяющее значение для новых предложений. И нет сомнений, что элементы политического процесса, вне зависимости от их уровня, должны быть разоблачены. Но сложившаяся структура организации играет определяющее значение для модели развития. В своём стремлении повысить качество жизни, они забывают, что укрепление и развитие внутренней структуры обеспечивает широкому кругу (специалистов) участие в формировании как самодостаточных, так и внешне зависимых концептуальных решений.`

	const textExampleElement = selector('#textExample')
	const inputElement = selector('#input')

	const lines = getLines(text)
	const pressed = []

	let letterId = 0

	let downCounter = 0
	let downCounter_error = 0

	let startMomemnt = null
	let started = false

	init()

	function init () {
		inputElement.value = ''
		inputElement.focus()

		textExampleUpdate()

		inputElement.addEventListener('keydown', function (event) {
			if (event.key.startsWith('F') && event.key.length > 1) {
				return
			}

			pressed.push(event.key.toLowerCase())
			setHint(event.key.toLowerCase(), 'on')

			if (!started) {
				started = true
				startMomemnt = Date.now()
			}

			const letter = getLetter(letterId)
			const startLineNumber = getLineNumber(letterId)

			downCounter++

			if (event.key === letter.originalLabel || event.key === 'Enter' && letter.originalLabel === '\n') {
				letterId++
			}

			else {
				event.preventDefault()

				downCounter_error++

				for (const line of lines) {
					for (const item of line) {
						if (item.originalLabel === letter.originalLabel) {
							item.success = false
						}
					}
				}
			}

			textExampleUpdate()

			if (startLineNumber !== getLineNumber(letterId)) {
				selector('#symbolsPerMinute').textContent = Math.floor(60000 * downCounter / (Date.now() - startMomemnt))
				selector('#errorPercent').textContent = percentOf(downCounter_error, downCounter) + '%'

				event.preventDefault()
				inputElement.value = ''
				started = false
				downCounter = 0
				downCounter_error = 0
			}
		})

		inputElement.addEventListener('keyup', function (event) {
			const index = pressed.indexOf(event.key.toLowerCase())

			pressed.splice(index, 1)
			setHint(event.key.toLowerCase(), 'off')
		})
	}

	function getLetter (id) {
		for (const line of lines) {
			for (const letter of line) {
				if (letter.id === id) {
					return letter
				}
			}
		}
	}

	function getLineNumber (id) {
		for (let i = 0; i < lines.length; i++) {
			if (firstElement(lines[i]).id <= id && id <= lastElement(lines[i]).id) {
				return i
			}
		}
	}

	function setHint (letter, mode = 'off') {
		switch (letter) {
			case '.':
			case ',':
				letter = 'dot'
				break

			case ' ':
				letter = 'space'
				break

			case '\\':
				letter = 'slash'
				break

			case '-':
				letter = 'minus'
				break

			case '+':
				letter = 'minus'
				break
		}

		if (letter === 'shift') {
			const elements = selectors('.shift')

			for (const element of elements) {
				if (mode === 'off') {
					element.classList.remove('hint')
				} else if (mode = 'on') {
					element.classList.add('hint')
				} else if (mode === 'toggle') {
					element.classList.toggle('hint')
				}
			}

			return
		} 

		try {
			const element = selector('#letter_' + letter)			

			if (!element) {
				return
			}

			if (mode === 'off') {
				element.classList.remove('hint')
			} else if (mode = 'on') {
				element.classList.add('hint')
			} else if (mode === 'toggle') {
				element.classList.toggle('hint')
			}
		} catch (err) {}
	}

	function textExampleUpdate () {
		textExampleElement.innerHTML = ''

		const currentLineNumber = getLineNumber(letterId)

		for (let i = 0; i < 3; i++) {
			if (!lines[i + currentLineNumber]) {
				break
			}

			const htmlLine = lineToHTML(lines[i + currentLineNumber], letterId)
			textExampleElement.append(htmlLine)
		}
	}

	function lineToHTML (line, currentId) {
		const divElement = create('div')
		divElement.className = 'line'

		for (const letter of line) {
			const spanElement = create('span')
			spanElement.textContent = letter.label

			if (currentId > letter.id) {
				spanElement.className = 'done'
			}

			else if (!letter.success) {
				spanElement.className = 'hint'
			}

			divElement.append(spanElement)
		}

		return divElement
	}

	function getLines (originalText) {
		const text = originalText.trim().replace(/[\t\ ]+/, ' ') + '\n'
		const lines = []

		let line = []
		let word = []
		let counter = 0

		for (const letter of text) {
			let specLetter = ''

			if (letter === '\n') {
				specLetter = '¶'
			} else if (letter === ' ') {
				specLetter = 'º'
			} else {
				specLetter = letter
			}

			word.push({
				id: counter++,
				label: specLetter,
				originalLabel: letter,
				success: true
			})

			if (line.length + word.length > 70) {
				lines.push(line)
				line = []
			}

			if (letter === '\n' || letter === ' ') {
				line.push(...word)
				word = []
			}

			if (letter === '\n' || line.length === 70) {
				lines.push(line)
				line = []
			}
		}

		return lines
	}
})();