
const str=`
    import "../../static/css/common.less"
`;

module.exports = function(content) {
    return content.replace('/*inject css*/', str);
};
