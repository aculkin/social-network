const me = async (req, res) => {
  try {
    res.status(200).json(req?.user || null)
  } catch (error) {
    console.error(error)
  }
}

module.exports = me
