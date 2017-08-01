module.exports = Cmds.addCommand({
    cmds: [';ban ', ';banhammer ', ';permaban '],

    requires: {
        guild: true,
        loud: false,
    },

    desc: 'Ban a user from the guild',

    args: '([@user] | [id] | [name]) (OPTIONAL: [reason])',

    example: 'vaeb being weird',

    // /////////////////////////////////////////////////////////////////////////////////////////

    func: (cmd, args, msgObj, speaker, channel, guild) => {
        const highestRoleLower = speaker.highestRole.name.toLowerCase();
        if (!highestRoleLower.includes('head ') && /\bmod/g.test(highestRoleLower)) return Util.commandFailed(channel, speaker, 'Moderators are not allowed to use the ban command | Please use tempban instead');

        const data = Util.getDataFromString(args, [
            function (str) {
                return Util.getMemberByMixed(str, guild);
            },
        ], true);
        if (!data) return Util.commandFailed(channel, speaker, 'User not found');

        const target = data[0];
        const reason = data[1];

        Admin.addBan(guild, channel, target, speaker, { reason });

        // if (guild.id == '168742643021512705') index.dailyBans.push([targId, `${targName}#${target.discriminator}`, reason]);

        return true;
    },
});
