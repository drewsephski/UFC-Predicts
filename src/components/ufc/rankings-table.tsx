"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Flag, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface Fighter {
    id: string;
    name: string;
    country: string;
    record: string;
}

interface RankingsTableProps {
    division: string;
    champion: Fighter;
    rankings: Fighter[];
}

const RankingsTable = ({
    division,
    champion,
    rankings,
}: RankingsTableProps) => {
    return (
        <div className="w-full">
            <h3 className="text-2xl font-bold mb-4 text-red-500 border-b border-red-500/30 pb-2">{division}</h3>
            <div className="p-4 mb-6 rounded-md bg-gradient-to-r from-red-950/40 to-black border border-red-500/30 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 mr-3 shadow-md">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-xl text-white">{champion.name}</div>
                            <div className="flex items-center text-sm text-gray-300 mt-1">
                                <Flag className="w-3 h-3 mr-1" />
                                {champion.country}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-lg text-white">{champion.record}</div>
                        <Button asChild variant="link" size="sm" className="p-0 h-auto text-red-400 hover:text-red-300">
                            <Link href={`/fighters/${champion.id}`}>
                                View Champion Profile
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border border-red-500/20 rounded-md overflow-hidden shadow-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-red-950/60 to-black border-b border-red-500/30">
                            <TableHead className="w-[80px] text-gray-200 font-bold">Rank</TableHead>
                            <TableHead className="text-gray-200 font-bold">Fighter</TableHead>
                            <TableHead className="text-gray-200 font-bold">Country</TableHead>
                            <TableHead className="text-right text-gray-200 font-bold">Record</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rankings.map((fighter, index) => (
                            <TableRow
                                key={fighter.id}
                                className="hover:bg-red-950/20 border-b border-red-500/10"
                            >
                                <TableCell className="font-medium text-red-500">
                                    #{index + 1}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/fighters/${fighter.id}`}
                                        className="hover:text-red-400 transition-colors font-medium"
                                    >
                                        {fighter.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-gray-300">
                                        <Flag className="w-3 h-3 mr-1 text-gray-400" />
                                        {fighter.country}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">{fighter.record}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RankingsTable;
