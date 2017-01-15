var CBase = {};
CBase.className = "CBase";
CBase.Create = function()
{
	this.class = CBase;
}
CBase.Extend = function(/* varargs */)
{
	var _result = {};
	for(var method in this)
		_result[method] = this[method];
	_result.Create = arguments[0] || this.Create;
	_result.Extend = this.Extend;
	_result.Create.prototype = new this.Create();
	if(arguments.length > 1)
		for(var iX=1; iX<arguments.length; ++iX)
			_result.Create.prototype[arguments[iX].name] = arguments[iX];
	return _result;
}
CBase.Create.prototype.GetClassName = function()
{
	return this.class.className;
}
CBase.Create.prototype.GetClass = function()
{
	return this.class;
}