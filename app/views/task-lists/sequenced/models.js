module.exports = {
  thirdTask: {
    includeIf: data => TaskListOps.taskStatus(data, mockSchema.secondTask) === TaskListOps.STATUS.COMPLETE,
    path: '/',
    summaryPath: './includes/summaries/thirdTask.html',
    title: 'Third task',
    customTitle: data => data['has-car'] === 'yes' ? 'About your car' : 'About buying cars',
    pages: {
      'what-is-a-good-car-price': {
        fields: {
          'good-car-price': {
            type: 'currency',
            name: 'how much you would pay for a car',
            currencyMin: 1
          }
        }
      }
    }
  }
}
